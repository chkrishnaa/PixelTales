import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema(
  {
    userId: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
      index:    true,
    },

    name: {
      type:      String,
      required:  [true, 'Collection name is required'],
      trim:      true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },

    // Array of catalog movie ID strings (e.g. "d-steel-troops")
    movieIds: {
      type:    [String],
      default: [],
    },
  },
  { timestamps: true }
);

// One user can't have two collections with the same name
collectionSchema.index({ userId: 1, name: 1 }, { unique: true });

export default mongoose.model('Collection', collectionSchema);
