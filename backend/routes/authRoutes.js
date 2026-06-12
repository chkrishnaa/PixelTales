import express  from 'express';
import passport from 'passport';
import multer   from 'multer';
import { body } from 'express-validator';
import {
  register,
  login,
  googleCallback,
  getMe,
  uploadAvatar,
  forgotPassword,
  verifyOTP,
  resetPassword,
} from '../controllers/authController.js';
import { protect } from '../middlewares/auth.js';

const router  = express.Router();
const upload  = multer({ storage: multer.memoryStorage(), limits: { fileSize: 4 * 1024 * 1024 } });

/* ── Email / Password ──────────────────────────────────── */
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }),
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
], login);

/* ── Google OAuth ───────────────────────────────────────── */
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed`, session: false }),
  googleCallback
);

/* ── Auth user info ─────────────────────────────────────── */
router.get('/me', protect, getMe);

/* ── Avatar upload ──────────────────────────────────────── */
router.post('/avatar', protect, upload.single('avatar'), uploadAvatar);

/* ── Forgot Password / OTP / Reset ─────────────────────── */
router.post('/forgot-password',  forgotPassword);
router.post('/verify-otp',       verifyOTP);
router.post('/reset-password',   resetPassword);

export default router;
