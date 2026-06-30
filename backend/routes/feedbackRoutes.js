import express from 'express';
import { body } from 'express-validator';
import {
  submitFeedback,
  getAllFeedback,
  getMyFeedback,
  deleteFeedback,
  updateFeedbackStatus,
} from '../controllers/feedbackController.js';

const router = express.Router();

const feedbackValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),

  body('email')
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),

  body('feedbackType')
    .optional()
    .isIn(['bug', 'feature', 'content', 'performance', 'compliment', 'question', 'other'])
    .withMessage('Invalid feedback type'),

  body('sentiment')
    .optional()
    .isIn([
      'love', 'happy', 'laugh', 'wow', 'fire',
      'cool', 'heart', 'clap', 'rocket', 'star',
      'neutral', 'confused', 'bored', 'sad', 'angry',
    ])
    .withMessage('Invalid sentiment'),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ max: 1000 }).withMessage('Message cannot exceed 1000 characters'),
];

// Public — submit feedback (multiple submissions allowed)
router.post('/', feedbackValidation, submitFeedback);

// Public — get feedbacks by email (?email=)
router.get('/mine', getMyFeedback);

// Public — get all feedbacks with optional filters
router.get('/', getAllFeedback);

// Public — delete own feedback (verified by email in body)
router.delete('/:id', deleteFeedback);

// Admin — update status of a feedback
router.patch('/:id/status', updateFeedbackStatus);

export default router;
