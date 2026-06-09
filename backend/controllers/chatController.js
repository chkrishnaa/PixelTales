import { validationResult } from 'express-validator';
import ChatRoom from '../models/ChatRoom.js';
import Message  from '../models/Message.js';

/* ── Single community room config ───────────────────────── */
const COMMUNITY_SLUG = 'community';
const COMMUNITY_DEFAULTS = {
  name:        'PixelTales Community',
  description: 'One place for every PixelTales fan — chat, share & connect!',
  icon:        '🎬',
  gradient:    'linear-gradient(135deg,#0f766e,#06b6d4)',
  cartoonId:   null,
};

/**
 * Returns the single community ChatRoom document,
 * creating it on first call if it does not yet exist.
 */
async function getCommunityRoomDoc() {
  let room = await ChatRoom.findOne({ name: COMMUNITY_DEFAULTS.name, isActive: true });
  if (!room) {
    room = await ChatRoom.create(COMMUNITY_DEFAULTS);
  }
  return room;
}

/* ── Community endpoints ────────────────────────────────── */

/**
 * GET /api/chat/community
 * Returns info about the single community group.
 */
export const getCommunity = async (req, res, next) => {
  try {
    const room    = await getCommunityRoomDoc();
    const lastMsg = await Message.findOne({ room: room._id, isDeleted: false })
      .sort({ createdAt: -1 })
      .select('userName text createdAt')
      .lean();

    res.json({ success: true, data: { ...room.toObject(), lastMessage: lastMsg ?? null } });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/chat/community/messages
 * Paginated messages for the community group (chronological order).
 * Query params: page (default 1), limit (default 50)
 */
export const getCommunityMessages = async (req, res, next) => {
  try {
    const room  = await getCommunityRoomDoc();
    const page  = Math.max(1, parseInt(req.query.page  ?? '1'));
    const limit = Math.min(100, parseInt(req.query.limit ?? '50'));
    const skip  = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      Message.find({ room: room._id, isDeleted: false })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Message.countDocuments({ room: room._id, isDeleted: false }),
    ]);

    res.json({
      success: true,
      data:    messages.reverse(),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/chat/community/messages
 * Send a message to the community group. Requires authentication.
 */
export const sendCommunityMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const room = await getCommunityRoomDoc();

    const msg = await Message.create({
      room:     room._id,
      userId:   req.user._id,
      userName: req.user.name,
      text:     req.body.text.trim(),
    });

    await ChatRoom.findByIdAndUpdate(room._id, { $inc: { messageCount: 1 } });

    res.status(201).json({ success: true, data: msg });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/chat/community/messages/:msgId
 * Soft-delete a community message — owner or admin only.
 */
export const deleteCommunityMessage = async (req, res, next) => {
  try {
    const msg = await Message.findById(req.params.msgId);
    if (!msg || msg.isDeleted)
      return res.status(404).json({ success: false, message: 'Message not found.' });

    const isOwner = msg.userId?.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin)
      return res.status(403).json({ success: false, message: 'Not authorised.' });

    msg.isDeleted = true;
    await msg.save();

    res.json({ success: true, message: 'Message deleted.' });
  } catch (err) {
    next(err);
  }
};

/* ── Legacy multi-room endpoints (kept for compatibility) ── */

/**
 * GET /api/chat/rooms
 */
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await ChatRoom.find({ isActive: true }).sort({ messageCount: -1 });

    const enriched = await Promise.all(
      rooms.map(async (room) => {
        const last = await Message.findOne({ room: room._id, isDeleted: false })
          .sort({ createdAt: -1 })
          .select('userName text createdAt')
          .lean();
        return { ...room.toObject(), lastMessage: last ?? null };
      })
    );

    res.json({ success: true, data: enriched });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/chat/rooms  (admin only)
 */
export const createRoom = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const { name, description, icon, cartoonId, gradient } = req.body;
    const room = await ChatRoom.create({ name, description, icon, cartoonId, gradient });

    res.status(201).json({ success: true, data: room });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/chat/rooms/:roomId/messages
 */
export const getMessages = async (req, res, next) => {
  try {
    const room = await ChatRoom.findById(req.params.roomId);
    if (!room || !room.isActive)
      return res.status(404).json({ success: false, message: 'Chat room not found.' });

    const page  = Math.max(1, parseInt(req.query.page  ?? '1'));
    const limit = Math.min(100, parseInt(req.query.limit ?? '50'));
    const skip  = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      Message.find({ room: room._id, isDeleted: false })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Message.countDocuments({ room: room._id, isDeleted: false }),
    ]);

    res.json({
      success: true,
      data:    messages.reverse(),
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/chat/rooms/:roomId/messages
 */
export const sendMessage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const room = await ChatRoom.findById(req.params.roomId);
    if (!room || !room.isActive)
      return res.status(404).json({ success: false, message: 'Chat room not found.' });

    const msg = await Message.create({
      room:     room._id,
      userId:   req.user._id,
      userName: req.user.name,
      text:     req.body.text.trim(),
    });

    await ChatRoom.findByIdAndUpdate(room._id, { $inc: { messageCount: 1 } });

    res.status(201).json({ success: true, data: msg });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/chat/rooms/:roomId/messages/:msgId
 */
export const deleteMessage = async (req, res, next) => {
  try {
    const msg = await Message.findById(req.params.msgId);
    if (!msg || msg.isDeleted)
      return res.status(404).json({ success: false, message: 'Message not found.' });

    const isOwner = msg.userId?.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin)
      return res.status(403).json({ success: false, message: 'Not authorised.' });

    msg.isDeleted = true;
    await msg.save();

    res.json({ success: true, message: 'Message deleted.' });
  } catch (err) {
    next(err);
  }
};
