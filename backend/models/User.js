import mongoose from 'mongoose';
import bcrypt   from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type:      String,
      required:  [true, 'Name is required'],
      trim:      true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },

    email: {
      type:      String,
      required:  [true, 'Email is required'],
      unique:    true,
      trim:      true,
      lowercase: true,
      match:     [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },

    password: {
      type:     String,
      minlength: [8, 'Password must be at least 8 characters'],
      select:   false,   // never returned in queries by default
    },

    role: {
      type:    String,
      enum:    ['admin', 'customer'],
      default: 'customer',
    },

    // Google OAuth
    googleId: { type: String, sparse: true },
    avatar:   { type: String, default: '' },

    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare plain password with hash
userSchema.methods.comparePassword = async function (plain) {
  return bcrypt.compare(plain, this.password);
};

export default mongoose.model('User', userSchema);
