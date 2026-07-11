import express from 'express';
import { body } from 'express-validator';
import {
  getAllReviews,
  getMyReview,
  submitReview,
  updateReview,
  deleteReview,
  likeReview,
  dislikeReview,
} from '../controllers/reviewController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

const reviewValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),

  body('email')
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),

  body('rating')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be a whole number between 1 and 5'),

  body('review')
    .trim()
    .notEmpty().withMessage('Review text is required')
    .isLength({ max: 1000 }).withMessage('Review cannot exceed 1000 characters'),
];

const updateValidation = [
  body('email')
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),

  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),

  body('review')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Review cannot exceed 1000 characters'),
];

// Public — get all non-deleted reviews
router.get('/', getAllReviews);

// Public — check if a user already has a review (?email=...)
router.get('/me', getMyReview);

// Public — submit review (one per user/email)
router.post('/', protect, reviewValidation, submitReview);

// Authenticated user — edit own review (verified by email match)
router.put('/:id', protect, updateValidation, updateReview);

// Authenticated user — soft-delete own review (verified by email match)
router.delete('/:id', protect, deleteReview);

// Authenticated — like / dislike (must be logged in)
router.post('/:id/like',    protect, likeReview);
router.post('/:id/dislike', protect, dislikeReview);

export default router;
