import mongoose from 'mongoose';

const movieCommentSchema = new mongoose.Schema(
  {
    movieId: {
      type:     String,
      required: [true, 'movieId is required'],
      index:    true,
      trim:     true,
    },

    // null = top-level comment; ObjectId = reply to another comment
    parentId: {
      type:    mongoose.Schema.Types.ObjectId,
      ref:     'MovieComment',
      default: null,
      index:   true,
    },

    userId: {
      type:    mongoose.Schema.Types.ObjectId,
      ref:     'User',
      default: null,
    },

    userName: {
      type:     String,
      required: [true, 'User name is required'],
      trim:     true,
    },

    // When replying, store the parent author's name for @mention display
    replyToName: {
      type:    String,
      default: null,
      trim:    true,
    },

    text: {
      type:      String,
      required:  [true, 'Comment text is required'],
      trim:      true,
      maxlength: [500, 'Comment cannot exceed 500 characters'],
    },

    // Users who liked this comment
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

movieCommentSchema.index({ movieId: 1, parentId: 1, createdAt: 1 });

export default mongoose.model('MovieComment', movieCommentSchema);
