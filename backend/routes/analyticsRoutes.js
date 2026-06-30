import express from 'express';
import { getAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

// Public — no auth required
router.get('/', getAnalytics);

export default router;
