import express  from 'express';
import { body }  from 'express-validator';
import {
  getCommunity,
  getCommunityMessages,
  sendCommunityMessage,
  deleteCommunityMessage,
  getRooms,
  createRoom,
  getMessages,
  sendMessage,
  deleteMessage,
} from '../controllers/chatController.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

/* ── Single community group ─────────────────────────────────── */

// Public — community group info
router.get('/community', getCommunity);

// Public — read community messages
router.get('/community/messages', getCommunityMessages);

// Authenticated — send a community message
router.post('/community/messages', protect, [
  body('text').trim().notEmpty().withMessage('Message text is required').isLength({ max: 1000 }),
], sendCommunityMessage);

// Authenticated (owner or admin) — delete a community message
router.delete('/community/messages/:msgId', protect, deleteCommunityMessage);

/* ── Legacy multi-room routes (kept for compatibility) ──────── */

router.get('/rooms', getRooms);

router.post('/rooms', protect, adminOnly, [
  body('name').trim().notEmpty().withMessage('Room name is required').isLength({ max: 80 }),
  body('description').optional().isLength({ max: 200 }),
], createRoom);

router.get('/rooms/:roomId/messages', getMessages);

router.post('/rooms/:roomId/messages', protect, [
  body('text').trim().notEmpty().withMessage('Message text is required').isLength({ max: 1000 }),
], sendMessage);

router.delete('/rooms/:roomId/messages/:msgId', protect, deleteMessage);

export default router;
