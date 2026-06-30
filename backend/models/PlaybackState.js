import mongoose from 'mongoose';

/**
 * PlaybackState — Server authoritative playback synchronization.
 * Stores currentTime, isPlaying, rate, etc.
 * Late-joining users fetch this to sync video playback.
 */
const playbackStateSchema = new mongoose.Schema({
  // Link to PartyState
  partyId:         { type: mongoose.Schema.Types.ObjectId, ref: 'PartyState', required: true, unique: true },
  code:            { type: String, required: true, uppercase: true },

  // Playback state
  isPlaying:       { type: Boolean, default: false },
  currentTime:     { type: Number, default: 0 },  // seconds
  playbackRate:    { type: Number, default: 1.0 },
  duration:        { type: Number, default: 0 },

  // Control
  controlledByHostId: { type: String, default: null }, // only host can control
  lastControlledAt:   { type: Date, default: null },
  lastUpdatedAt:      { type: Date, default: Date.now },

  // Timestamps
  createdAt:       { type: Date, default: Date.now },
  updatedAt:       { type: Date, default: Date.now },

  // Auto-expire
  expiresAt:       { type: Date, default: () => new Date(Date.now() + 6 * 60 * 60 * 1000), index: { expireAfterSeconds: 0 } },
});

playbackStateSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('PlaybackState', playbackStateSchema);
