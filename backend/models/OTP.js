import mongoose from 'mongoose';
import bcrypt   from 'bcryptjs';

const otpSchema = new mongoose.Schema({
  email: {
    type:      String,
    required:  true,
    lowercase: true,
    trim:      true,
  },

  otp: {
    type:     String,
    required: true,   // stored as bcrypt hash
  },

  purpose: {
    type: String,
    enum: ['password_reset', 'email_verify'],
    default: 'password_reset',
  },

  expiresAt: {
    type:    Date,
    default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
  },

  isUsed: { type: Boolean, default: false },
});

// Auto-delete expired docs via MongoDB TTL index
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

otpSchema.methods.verifyOTP = async function (plain) {
  return bcrypt.compare(plain, this.otp);
};

export default mongoose.model('OTP', otpSchema);
