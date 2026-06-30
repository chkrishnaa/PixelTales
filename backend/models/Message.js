import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    room: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'ChatRoom',
      required: true,
      index:    true,
    },

    // Author info — denormalized for performance (no extra join needed)
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'User',
      default: null,
    },

    userName: {
      type:     String,
      required: [true, 'User name is required'],
      trim:     true,
    },

    // Denormalised avatar URL for fast reads (no join needed in most cases)
    userAvatar: {
      type:    String,
      default: '',
    },

    text: {
      type:      String,
      required:  [true, 'Message text is required'],
      trim:      true,
      maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },

    // Soft-delete
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Pagination index
messageSchema.index({ room: 1, createdAt: -1 });

export default mongoose.model('Message', messageSchema);
