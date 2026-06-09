import express from 'express';
import { body } from 'express-validator';
import {
  getMovieStats,
  getBatchStats,
  toggleLike,
  getComments,
  addComment,
  deleteComment,
  toggleCommentLike,
} from '../controllers/movieController.js';
import { protect, optionalAuth } from '../middlewares/auth.js';

const router = express.Router();

/* ── Batch stats ─────────────────────────────────────────── */
router.post('/stats/batch', optionalAuth, getBatchStats);

/* ── Per-movie stats ─────────────────────────────────────── */
router.get('/:movieId/stats',  optionalAuth, getMovieStats);
router.post('/:movieId/like',  protect,      toggleLike);

/* ── Comments ────────────────────────────────────────────── */
router.get('/:movieId/comments', optionalAuth, getComments);

router.post('/:movieId/comments', protect, [
  body('text')
    .trim()
    .notEmpty().withMessage('Comment text is required')
    .isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters'),
  body('parentId').optional().isMongoId().withMessage('Invalid parent ID'),
], addComment);

router.delete('/:movieId/comments/:commentId', protect, deleteComment);

/* ── Per-comment like toggle ─────────────────────────────── */
router.post('/:movieId/comments/:commentId/like', protect, toggleCommentLike);

export default router;
