import mongoose from 'mongoose';

const CharacterSchema = new mongoose.Schema({
  name: String,
  role: String,
  photo: String,
  bio: String,
});

const MovieSchema = new mongoose.Schema({
  movieId: { type: String, required: true, unique: true },
  title: { type: [String], default: [] },
  cartoonId: { type: String, index: true },
  gradient: String,
  progress: Number,
  videoUrl: String,
  thumbnail: String,
  rating: Number,
  year: Number,
  releaseDate: Date,
  duration: Number,
  language: String,
  quality: String,
  studio: String,
  favorited: { type: Boolean, default: false },
  director: String,
  country: String,
  genres: [String],
  description: String,
  characters: [CharacterSchema],
  gallery: [String],
  // Admin-controlled flags
  isPrime: { type: Boolean, default: false },
  isRecommended: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Movie', MovieSchema);
