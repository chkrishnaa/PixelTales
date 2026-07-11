import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
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
    },
    avatar: {
      type: String,
      default: "",
    },

    feedbackType: {
      type: String,
      enum: [
        "bug",
        "feature",
        "content",
        "performance",
        "compliment",
        "question",
        "other",
      ],
      default: "other",
    },

    sentiment: {
      type: String,
      enum: [
        "love",
        "happy",
        "laugh",
        "wow",
        "fire",
        "cool",
        "heart",
        "clap",
        "rocket",
        "star",
        "neutral",
        "confused",
        "bored",
        "sad",
        "angry",
      ],
      default: "neutral",
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },

    // Admin-only field to track resolution status
    status: {
      type: String,
      enum: ["pending", "reviewed", "resolved"],
      default: "pending",
    },
  },
  {
    // Only createdAt — feedback cannot be edited so updatedAt is not needed
    timestamps: { createdAt: true, updatedAt: false },
  },
);

export default mongoose.model('Feedback', feedbackSchema);
