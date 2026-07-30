import express from 'express';
import {
  getWatchData,
  trackVisit,
  updateProgress,
  removeRecord,
  clearWatchData,
  bulkImport,
} from '../controllers/watchController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// All watch routes require authentication
router.use(protect);

/* ── Get all watch data (history + continue watching) ─────── */
router.get('/', getWatchData);

/* ── Bulk import from localStorage (migration helper) ──────── */
router.post('/bulk', bulkImport);

/* ── Track a movie page visit ──────────────────────────────── */
router.put('/:movieId/visit', trackVisit);

/* ── Update playback progress ──────────────────────────────── */
router.put('/:movieId/progress', updateProgress);

/* ── Remove a single record ────────────────────────────────── */
router.delete('/:movieId', removeRecord);

/* ── Clear all history or continue-watching ────────────────── */
router.delete('/', clearWatchData);

export default router;
