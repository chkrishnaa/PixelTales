import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
      // One review per user — enforced at DB level
      unique: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },

    review: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
      maxlength: [1000, "Review cannot exceed 1000 characters"],
    },

    // Users who liked this review
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Users who disliked this review
    dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    // Soft-delete flag — keeps data for analytics but hides from public
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Both createdAt + updatedAt since the user can edit their review
    timestamps: true,
  },
);

export default mongoose.model('Review', reviewSchema);
