import mongoose from 'mongoose';

/**
 * WatchRecord
 *
 * One document per (user, movie) pair.
 * Tracks both visit history and continue-watching progress in a single record.
 *
 * Fields:
 *   visitedAt      — set/refreshed every time the user opens the movie detail page
 *   watchedSeconds — cumulative seconds watched (updated while playing)
 *   progress       — 0-95% of total duration watched
 *   lastWatched    — timestamp of most recent progress update
 *   isInProgress   — true once watchedSeconds >= 180 (3 minutes)
 */
const watchRecordSchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
      index:    true,
    },
    movieId: {
      type:     String,
      required: true,
    },

    // ── History ────────────────────────────────────────────
    visitedAt: {
      type:    Date,
      default: null,
    },

    // ── Continue Watching ──────────────────────────────────
    watchedSeconds: {
      type:    Number,
      default: 0,
    },
    progress: {
      type:    Number,   // 0–95
      default: null,
    },
    lastWatched: {
      type:    Date,
      default: null,
    },
    isInProgress: {
      type:    Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// One record per (user, movie) — enforce at DB level
watchRecordSchema.index({ userId: 1, movieId: 1 }, { unique: true });

export default mongoose.model('WatchRecord', watchRecordSchema);
