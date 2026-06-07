import mongoose from 'mongoose';

const chatRoomSchema = new mongoose.Schema(
  {
    name: {
      type:      String,
      required:  [true, 'Room name is required'],
      trim:      true,
      maxlength: [80, 'Room name cannot exceed 80 characters'],
    },

    description: {
      type:      String,
      trim:      true,
      maxlength: [200, 'Description cannot exceed 200 characters'],
      default:   '',
    },

    icon: { type: String, default: '💬' },

    // Links to a cartoon series (null = general room)
    cartoonId: { type: String, default: null },

    // CSS gradient string for the room card
    gradient: { type: String, default: 'linear-gradient(135deg,#0f766e,#06b6d4)' },

    memberCount:  { type: Number, default: 0 },
    messageCount: { type: Number, default: 0 },

    // Soft-delete
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('ChatRoom', chatRoomSchema);
