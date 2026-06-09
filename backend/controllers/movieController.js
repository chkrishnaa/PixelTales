import { validationResult } from 'express-validator';
import MovieStat    from '../models/MovieStat.js';
import MovieComment from '../models/MovieComment.js';

/* ── Helper — get-or-create stat doc for a movie ─────────── */
async function getOrCreateStat(movieId) {
  let stat = await MovieStat.findOne({ movieId });
  if (!stat) stat = await MovieStat.create({ movieId });
  return stat;
}

/* ── Helper — build nested comment tree from flat list ───── */
function buildCommentTree(flatComments, meId) {
  const map = {};
  const roots = [];

  for (const c of flatComments) {
    map[c._id.toString()] = {
      id:         c._id.toString(),
      _dbId:      c._id.toString(),
      user:       c.userName,
      isAdmin:    false,
      replyTo:    c.replyToName ?? null,
      text:       c.text,
      likes:      c.likedBy.length,
      likedByMe:  meId ? c.likedBy.some((id) => id.toString() === meId) : false,
      likedBy:    c.likedBy.map((id) => ({ name: 'User', email: '' })),
      timestamp:  timeAgo(c.createdAt),
      createdAt:  c.createdAt,
      userId:     c.userId?.toString() ?? null,
      parentId:   c.parentId?.toString() ?? null,
      replies:    [],
    };
  }

  for (const id of Object.keys(map)) {
    const node = map[id];
    if (node.parentId && map[node.parentId]) {
      map[node.parentId].replies.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

function timeAgo(date) {
  const secs = Math.floor((Date.now() - new Date(date)) / 1000);
  if (secs < 60)   return 'Just now';
  if (secs < 3600) return `${Math.floor(secs / 60)}m`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h`;
  if (secs < 604800) return `${Math.floor(secs / 86400)}d`;
  return `${Math.floor(secs / 604800)}w`;
}

/* ── GET /api/movies/:movieId/stats ─────────────────────────
   Public — returns likes count, commentsCount, and (if auth)
   whether the current user has already liked it.
*/
export const getMovieStats = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const stat = await getOrCreateStat(movieId);

    const liked = req.user
      ? stat.likedBy.some((id) => id.toString() === req.user._id.toString())
      : false;

    res.json({
      success: true,
      data: {
        movieId,
        likes:         stat.likedBy.length,
        commentsCount: stat.commentsCount,
        liked,
      },
    });
  } catch (err) {
    next(err);
  }
};

/* ── POST /api/movies/stats/batch ───────────────────────────
   Public — fetch stats for multiple movies at once.
   Body: { ids: ['d1','d2',...] }
*/
export const getBatchStats = async (req, res, next) => {
  try {
    const ids = (req.body.ids ?? []).slice(0, 100);
    if (!ids.length) return res.json({ success: true, data: {} });

    const stats = await MovieStat.find({ movieId: { $in: ids } }).lean();
    const meId  = req.user?._id?.toString();
    const map   = {};

    for (const s of stats) {
      map[s.movieId] = {
        likes:         s.likedBy.length,
        commentsCount: s.commentsCount,
        liked:         meId ? s.likedBy.some((id) => id.toString() === meId) : false,
      };
    }

    for (const id of ids) {
      if (!map[id]) map[id] = { likes: 0, commentsCount: 0, liked: false };
    }

    res.json({ success: true, data: map });
  } catch (err) {
    next(err);
  }
};

/* ── POST /api/movies/:movieId/like ─────────────────────────
   Authenticated — toggle movie like.
*/
export const toggleLike = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const userId      = req.user._id;

    const stat         = await getOrCreateStat(movieId);
    const alreadyLiked = stat.likedBy.some((id) => id.toString() === userId.toString());

    if (alreadyLiked) stat.likedBy.pull(userId);
    else              stat.likedBy.push(userId);
    await stat.save();

    res.json({
      success: true,
      data: { movieId, likes: stat.likedBy.length, liked: !alreadyLiked },
    });
  } catch (err) {
    next(err);
  }
};

/* ── GET /api/movies/:movieId/comments ──────────────────────
   Public — returns all non-deleted comments as a nested tree.
*/
export const getComments = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const meId        = req.user?._id?.toString();

    const flat = await MovieComment.find({ movieId, isDeleted: false })
      .sort({ createdAt: 1 })
      .lean();

    const tree = buildCommentTree(flat, meId);

    res.json({ success: true, data: tree });
  } catch (err) {
    next(err);
  }
};

/* ── POST /api/movies/:movieId/comments ─────────────────────
   Authenticated — post a new top-level comment or a reply.
   Body: { text, parentId? (string ObjectId), replyToName? }
*/
export const addComment = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const { movieId }   = req.params;
    const { text, parentId, replyToName } = req.body;

    // Validate parentId if provided
    if (parentId) {
      const parent = await MovieComment.findById(parentId);
      if (!parent || parent.isDeleted || parent.movieId !== movieId)
        return res.status(400).json({ success: false, message: 'Invalid parent comment.' });
    }

    const comment = await MovieComment.create({
      movieId,
      parentId:    parentId ?? null,
      replyToName: replyToName ?? null,
      userId:      req.user._id,
      userName:    req.user.name,
      text:        text.trim(),
    });

    await MovieStat.findOneAndUpdate(
      { movieId },
      { $inc: { commentsCount: 1 } },
      { upsert: true }
    );

    const meId = req.user._id.toString();
    res.status(201).json({
      success: true,
      data: {
        id:        comment._id.toString(),
        _dbId:     comment._id.toString(),
        user:      comment.userName,
        isAdmin:   false,
        replyTo:   comment.replyToName ?? null,
        text:      comment.text,
        likes:     0,
        likedByMe: false,
        likedBy:   [],
        timestamp: 'Just now',
        parentId:  comment.parentId?.toString() ?? null,
        userId:    meId,
        replies:   [],
      },
    });
  } catch (err) {
    next(err);
  }
};

/* ── DELETE /api/movies/:movieId/comments/:commentId ────────
   Authenticated — soft-delete own comment (or admin).
*/
export const deleteComment = async (req, res, next) => {
  try {
    const comment = await MovieComment.findById(req.params.commentId);
    if (!comment || comment.isDeleted)
      return res.status(404).json({ success: false, message: 'Comment not found.' });

    const isOwner = comment.userId?.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin)
      return res.status(403).json({ success: false, message: 'Not authorised.' });

    comment.isDeleted = true;
    await comment.save();

    await MovieStat.findOneAndUpdate(
      { movieId: req.params.movieId },
      { $inc: { commentsCount: -1 } }
    );

    res.json({ success: true, message: 'Comment deleted.' });
  } catch (err) {
    next(err);
  }
};

/* ── POST /api/movies/:movieId/comments/:commentId/like ─────
   Authenticated — toggle like on a single comment.
*/
export const toggleCommentLike = async (req, res, next) => {
  try {
    const comment = await MovieComment.findById(req.params.commentId);
    if (!comment || comment.isDeleted)
      return res.status(404).json({ success: false, message: 'Comment not found.' });

    const userId       = req.user._id;
    const alreadyLiked = comment.likedBy.some((id) => id.toString() === userId.toString());

    if (alreadyLiked) comment.likedBy.pull(userId);
    else              comment.likedBy.push(userId);
    await comment.save();

    res.json({
      success: true,
      data: { likes: comment.likedBy.length, liked: !alreadyLiked },
    });
  } catch (err) {
    next(err);
  }
};
