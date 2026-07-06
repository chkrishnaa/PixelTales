import jwt      from 'jsonwebtoken';
import bcrypt   from 'bcryptjs';
import { validationResult } from 'express-validator';

import User       from '../models/User.js';
import OTP        from '../models/OTP.js';
import cloudinary from '../config/cloudinary.js';
import { sendOTPEmail, sendTemplateEmail } from "../config/email.js";

/* ── Helper ──────────────────────────────────────────────── */
const signToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '60d',
  });

const generateOTP = () =>
  String(Math.floor(100000 + Math.random() * 900000));

/* ── Register ────────────────────────────────────────────── */
export const register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const { name, email, password } = req.body;

    const normalizedEmail = email.toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      if (!existingUser.isVerified) {
        return res.status(409).json({
          success: false,
          message:
            "An account already exists for this email. Verify your email or request a new OTP.",
          email: normalizedEmail,
        });
      }

      return res
        .status(409)
        .json({ success: false, message: "Email already in use." });
    }

    const user = await User.create({
      name,
      email: normalizedEmail,
      password,
      isVerified: false,
    });

    await OTP.deleteMany({ email: normalizedEmail, purpose: "email_verify" });
    const rawOTP = generateOTP();
    const hashedOTP = await bcrypt.hash(rawOTP, 10);

    await OTP.create({
      email: normalizedEmail,
      otp: hashedOTP,
      purpose: "email_verify",
    });

    await sendOTPEmail(
      normalizedEmail,
      rawOTP,
      "Email Verification OTP",
      "Use the verification code below to activate your PixelTales account. This OTP is valid for 10 minutes.",
    );

    res.status(201).json({
      success: true,
      message:
        "Verification OTP sent to your email. Please verify to complete signup.",
      email: normalizedEmail,
    });
  } catch (err) {
    next(err);
  }
};

export const verifySignupOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res
        .status(400)
        .json({ success: false, message: "Email and OTP are required." });

    const record = await OTP.findOne({
      email: email.toLowerCase(),
      purpose: "email_verify",
      isUsed: false,
    });

    if (!record)
      return res
        .status(400)
        .json({ success: false, message: "OTP not found or already used." });

    if (record.expiresAt < new Date())
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });

    const valid = await record.verifyOTP(otp);
    if (!valid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect OTP." });

    record.isUsed = true;
    await record.save();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    user.isVerified = true;
    await user.save();

    const token = signToken(user._id);

    res.json({
      success: true,
      message: "Email verified successfully! You are now signed in.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const resendSignupOTP = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "No account found for this email." });

    if (user.isVerified)
      return res.status(400).json({
        success: false,
        message: "This account is already verified. Please log in.",
      });

    await OTP.deleteMany({ email: user.email, purpose: "email_verify" });
    const rawOTP = generateOTP();
    const hashedOTP = await bcrypt.hash(rawOTP, 10);

    await OTP.create({
      email: user.email,
      otp: hashedOTP,
      purpose: "email_verify",
    });

    await sendOTPEmail(
      user.email,
      rawOTP,
      "Email Verification OTP",
      "Use the verification code below to activate your PixelTales account. This OTP is valid for 10 minutes.",
    );

    res.json({
      success: true,
      message: "A new verification OTP has been sent to your email.",
    });
  } catch (err) {
    next(err);
  }
};

/* ── Login ───────────────────────────────────────────────── */
export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = signToken(user._id);

    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    });
  } catch (err) {
    next(err);
  }
};

/* ── Google OAuth callback ───────────────────────────────── */
export const googleCallback = (req, res) => {
  const token = signToken(req.user._id);
  const clientURL = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/$/, '');
  res.redirect(`${clientURL}/auth/callback?token=${token}`);
};

/* ── Get current user ────────────────────────────────────── */
export const getMe = async (req, res) => {
  res.json({
    success: true,
    user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role, avatar: req.user.avatar },
  });
};

/* ── Forgot Password — send OTP ──────────────────────────── */
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });

    const user = await User.findOne({ email: email.toLowerCase() });

    // Always respond the same to avoid email enumeration
    if (!user) {
      return res.json({ success: true, message: 'If that email exists, an OTP has been sent.' });
    }

    // Invalidate any previous unused OTPs for this email
    await OTP.deleteMany({ email: email.toLowerCase(), purpose: 'password_reset' });

    const rawOTP    = generateOTP();
    const hashedOTP = await bcrypt.hash(rawOTP, 10);

    await OTP.create({
      email:   email.toLowerCase(),
      otp:     hashedOTP,
      purpose: 'password_reset',
    });

    await sendOTPEmail(
      email,
      rawOTP,
      "Password Reset OTP",
      "Use the one-time password below to reset your PixelTales account password. This OTP is valid for 10 minutes.",
      "password-reset",
    );

    res.json({ success: true, message: 'OTP sent to your email. Valid for 10 minutes.' });
  } catch (err) {
    next(err);
  }
};

/* ── Verify OTP ──────────────────────────────────────────── */
export const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ success: false, message: 'Email and OTP are required.' });

    const record = await OTP.findOne({
      email:   email.toLowerCase(),
      purpose: 'password_reset',
      isUsed:  false,
    });

    if (!record)
      return res.status(400).json({ success: false, message: 'OTP not found or already used.' });

    if (record.expiresAt < new Date())
      return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });

    const valid = await record.verifyOTP(otp);
    if (!valid)
      return res.status(400).json({ success: false, message: 'Incorrect OTP.' });

    // Mark as used — don't delete yet, resetPassword checks it
    record.isUsed = true;
    await record.save();

    // Issue a short-lived reset token
    const resetToken = jwt.sign(
      { email: email.toLowerCase(), purpose: 'password_reset' },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ success: true, resetToken, message: 'OTP verified. You may now set a new password.' });
  } catch (err) {
    next(err);
  }
};

/* ── Upload Avatar ───────────────────────────────────────── */
export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded.' });

    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
    if (!CLOUDINARY_CLOUD_NAME || CLOUDINARY_CLOUD_NAME === 'your_cloud_name' ||
        !CLOUDINARY_API_KEY    || !CLOUDINARY_API_SECRET) {
      return res.status(503).json({
        success: false,
        message: 'Avatar upload is not configured. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET to your .env file.',
      });
    }

    // Upload buffer to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: 'pixeltales/avatars', transformation: [{ width: 200, height: 200, crop: 'fill', gravity: 'face' }] },
        (err, result) => err ? reject(err) : resolve(result)
      ).end(req.file.buffer);
    });

    // Delete old avatar from Cloudinary if it's a Cloudinary URL
    if (req.user.avatar?.includes('cloudinary')) {
      const publicId = req.user.avatar.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`pixeltales/avatars/${publicId}`).catch(() => {});
    }

    req.user.avatar = result.secure_url;
    await req.user.save();

    res.json({
      success: true,
      avatar: result.secure_url,
      user: { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role, avatar: result.secure_url },
    });
  } catch (err) {
    next(err);
  }
};

/* ── Reset Password ──────────────────────────────────────── */
export const resetPassword = async (req, res, next) => {
  try {
    const { resetToken, password, confirmPassword } = req.body;

    if (!resetToken || !password)
      return res
        .status(400)
        .json({
          success: false,
          message: "Reset token and new password are required.",
        });

    if (password !== confirmPassword)
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match." });

    if (password.length < 8)
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 8 characters.",
        });

    let payload;
    try {
      payload = jwt.verify(resetToken, process.env.JWT_SECRET);
    } catch {
      return res
        .status(400)
        .json({
          success: false,
          message: "Reset token is invalid or expired.",
        });
    }

    if (payload.purpose !== "password_reset")
      return res
        .status(400)
        .json({ success: false, message: "Invalid reset token." });

    const user = await User.findOne({ email: payload.email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    user.password = password;
    await user.save();

    // Notify user their password was updated
    try {
      await sendTemplateEmail(
        user.email,
        "Your password has been updated",
        "Your account password was successfully updated. If this wasn't you, please contact support immediately.",
        "password-updated",
      );
    } catch (e) {
      // don't block the response if email fails
      console.error("Failed to send password-updated email", e.message);
    }

    res.json({
      success: true,
      message: "Password reset successfully! You can now log in.",
    });
  } catch (err) {
    next(err);
  }
};
