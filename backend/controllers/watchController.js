import WatchRecord from '../models/WatchRecord.js';

/* ── GET /api/watch ─────────────────────────────────────────
   Returns all watch records for the logged-in user, split into
   two arrays that mirror the WatchContext shape:
     history        : [{ movieId, visitedAt }]   (all visited movies, newest first)
     continueWatching: [{ movieId, watchedSeconds, progress, lastWatched }]
                       (only isInProgress=true, most-recently-watched first)
*/
export const getWatchData = async (req, res, next) => {
  try {
    const records = await WatchRecord.find({ userId: req.user._id }).lean();

    const history = records
      .filter((r) => r.visitedAt)
      .sort((a, b) => new Date(b.visitedAt) - new Date(a.visitedAt))
      .map((r) => ({ movieId: r.movieId, visitedAt: r.visitedAt.toISOString() }));

    const continueWatching = records
      .filter((r) => r.isInProgress)
      .sort((a, b) => new Date(b.lastWatched) - new Date(a.lastWatched))
      .map((r) => ({
        movieId:       r.movieId,
        watchedSeconds: r.watchedSeconds,
        progress:      r.progress,
        lastWatched:   r.lastWatched?.toISOString() ?? null,
      }));

    res.json({ success: true, data: { history, continueWatching } });
  } catch (err) {
    next(err);
  }
};

/* ── PUT /api/watch/:movieId/visit ──────────────────────────
   Called whenever the user opens a movie's detail page.
   Upserts the visitedAt timestamp.
*/
export const trackVisit = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    await WatchRecord.findOneAndUpdate(
      { userId: req.user._id, movieId },
      { $set: { visitedAt: new Date() } },
      { upsert: true, new: true }
    );

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

/* ── PUT /api/watch/:movieId/progress ───────────────────────
   Called periodically while the video is playing.
   Body: { watchedSeconds, progress }
   Only persists once watchedSeconds >= 180 (3 minutes).
*/
export const updateProgress = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const { watchedSeconds, progress } = req.body;

    if (typeof watchedSeconds !== 'number' || watchedSeconds < 0) {
      return res.status(400).json({ success: false, message: 'Invalid watchedSeconds.' });
    }

    const MIN_WATCH_SECONDS = 180;
    if (watchedSeconds < MIN_WATCH_SECONDS) {
      // Not enough watch time — acknowledge but don't persist as in-progress
      return res.json({ success: true, saved: false });
    }

    await WatchRecord.findOneAndUpdate(
      { userId: req.user._id, movieId },
      {
        $set: {
          watchedSeconds,
          progress:     progress ?? null,
          lastWatched:  new Date(),
          isInProgress: true,
        },
      },
      { upsert: true, new: true }
    );

    res.json({ success: true, saved: true });
  } catch (err) {
    next(err);
  }
};

/* ── DELETE /api/watch/:movieId ─────────────────────────────
   Remove a single watch record (removes from both history AND
   continue watching for that movie).
*/
export const removeRecord = async (req, res, next) => {
  try {
    await WatchRecord.findOneAndDelete({
      userId:  req.user._id,
      movieId: req.params.movieId,
    });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

/* ── DELETE /api/watch ──────────────────────────────────────
   Clear ALL watch history for the user (keeps continueWatching intact
   by only nullifying visitedAt, or we can delete all — see body param).
   Body: { target: 'history' | 'continue' | 'all' }
*/
export const clearWatchData = async (req, res, next) => {
  try {
    const target = req.body?.target ?? 'history';

    if (target === 'all') {
      await WatchRecord.deleteMany({ userId: req.user._id });
    } else if (target === 'continue') {
      // Remove isInProgress flag + reset progress fields (keep history)
      await WatchRecord.updateMany(
        { userId: req.user._id },
        { $set: { isInProgress: false, watchedSeconds: 0, progress: null, lastWatched: null } }
      );
    } else {
      // history — remove visitedAt (keep continue-watching data)
      await WatchRecord.updateMany(
        { userId: req.user._id },
        { $set: { visitedAt: null } }
      );
    }

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

/* ── POST /api/watch/bulk ───────────────────────────────────
   Migration helper: upload a batch of existing localStorage records
   to MongoDB on first login from a new installation.
   Body: { history: [{movieId, visitedAt}], continueWatching: [{movieId, watchedSeconds, progress, lastWatched}] }
   Only writes if the server currently has 0 records for this user.
*/
export const bulkImport = async (req, res, next) => {
  try {
    const existing = await WatchRecord.countDocuments({ userId: req.user._id });
    if (existing > 0) {
      // Server already has data — don't overwrite with local cache
      return res.json({ success: true, imported: false, reason: 'server_has_data' });
    }

    const { history = [], continueWatching = [] } = req.body;

    // Merge: build a map keyed by movieId
    const map = {};

    for (const h of history) {
      if (!h.movieId) continue;
      map[h.movieId] = { ...(map[h.movieId] ?? {}), visitedAt: h.visitedAt ? new Date(h.visitedAt) : new Date() };
    }

    for (const c of continueWatching) {
      if (!c.movieId || typeof c.watchedSeconds !== 'number') continue;
      if (c.watchedSeconds < 180) continue;
      map[c.movieId] = {
        ...(map[c.movieId] ?? {}),
        watchedSeconds: c.watchedSeconds,
        progress:      c.progress ?? null,
        lastWatched:   c.lastWatched ? new Date(c.lastWatched) : new Date(),
        isInProgress:  true,
      };
    }

    const ops = Object.entries(map).map(([movieId, fields]) => ({
      updateOne: {
        filter: { userId: req.user._id, movieId },
        update: { $set: fields },
        upsert: true,
      },
    }));

    if (ops.length > 0) {
      await WatchRecord.bulkWrite(ops);
    }

    res.json({ success: true, imported: true, count: ops.length });
  } catch (err) {
    next(err);
  }
};
