import mongoose from 'mongoose';

const joinRequestSchema = new mongoose.Schema({
  userId:      { type: String, required: true },
  userName:    { type: String, required: true },
  status:      { type: String, enum: ['pending', 'admitted', 'dismissed'], default: 'pending' },
  requestedAt: { type: Date, default: Date.now },
});

const partySessionSchema = new mongoose.Schema({
  code:     { type: String, required: true, unique: true, uppercase: true, trim: true },
  movieId:  { type: String, required: true },
  hostId:   { type: String, required: true },
  hostName: { type: String, required: true },
  requests: [joinRequestSchema],
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 6 }, // auto-delete after 6 hours
});

export default mongoose.model('PartySession', partySessionSchema);
