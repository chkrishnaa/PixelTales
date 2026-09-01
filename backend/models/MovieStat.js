import mongoose from 'mongoose';

/**
 * Tracks per-movie community stats (likes, comment count).
 * movieId is the string ID from the frontend catalog (e.g. "d1", "p3").
 */
const movieStatSchema = new mongoose.Schema(
  {
    movieId: {
      type:     String,
      required: [true, 'movieId is required'],
      unique:   true,
      index:    true,
      trim:     true,
    },

    // Array of user ObjectIds who liked this movie
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    // Denormalized for fast reads — kept in sync by comment create/delete
    commentsCount: { type: Number, default: 0, min: 0 },

    // ── Permanent analytics counters (never decremented) ────
    // Total number of times any user has visited this movie's page.
    // Incremented on every visit; clearing history does NOT affect this.
    visitCount: { type: Number, default: 0, min: 0 },

    // Total seconds watched across ALL users — for averageWatchTime analytics.
    totalWatchedSeconds: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('MovieStat', movieStatSchema);
