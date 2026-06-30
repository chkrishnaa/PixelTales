import mongoose from 'mongoose';

/**
 * PartyState — Server source of truth for a watch party.
 * All clients render state from this model, never maintain local copies.
 */
const memberSchema = new mongoose.Schema({
  userId:     { type: String, required: true },
  userName:   { type: String, required: true },
  joinedAt:   { type: Date, default: Date.now },
  role:       { type: String, enum: ['host', 'guest'], default: 'guest' },
  _id:        false,
});

const waitingUserSchema = new mongoose.Schema({
  requestId:  { type: String, required: true, unique: true }, // dedupe key
  userId:     { type: String, required: true },
  userName:   { type: String, required: true },
  requestedAt: { type: Date, default: Date.now },
  status:     { type: String, enum: ['pending', 'admitted', 'dismissed'], default: 'pending' },
  _id:        false,
});

const partyStateSchema = new mongoose.Schema({
  // Link to PartySession
  partyId:    { type: mongoose.Schema.Types.ObjectId, ref: 'PartySession', required: true, unique: true },
  code:       { type: String, required: true, uppercase: true },

  // Core metadata
  hostId:     { type: String, required: true },
  hostName:   { type: String, required: true },
  movieId:    { type: String, required: true },

  // Canonical member list
  members:    [memberSchema],      // [ { userId, userName, joinedAt, role } ]
  
  // Waiting room requests (pending/admitted/dismissed)
  waitingUsers: [waitingUserSchema],

  // Party status
  started:    { type: Boolean, default: false },
  startedAt:  { type: Date, default: null },

  // Permissions (extensible for future features)
  permissions: {
    allowChat:        { type: Boolean, default: true },
    allowEmojiReact:  { type: Boolean, default: true },
    allowScreenShare: { type: Boolean, default: false },
    allowVoice:       { type: Boolean, default: false },
    _id:              false,
  },

  // Timestamps
  createdAt:  { type: Date, default: Date.now },
  updatedAt:  { type: Date, default: Date.now },

  // Auto-expire after 6 hours
  expiresAt:  { type: Date, default: () => new Date(Date.now() + 6 * 60 * 60 * 1000), index: { expireAfterSeconds: 0 } },
});

// Always update timestamp on save
partyStateSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('PartyState', partyStateSchema);
