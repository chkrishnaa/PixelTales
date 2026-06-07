import express  from 'express';
import { body }  from 'express-validator';
import {
  getRooms,
  createRoom,
  getMessages,
  sendMessage,
  deleteMessage,
} from '../controllers/chatController.js';
import { protect, adminOnly } from '../middlewares/auth.js';

const router = express.Router();

/* ── Rooms ──────────────────────────────────────────────────── */

// Public — anyone can browse rooms
router.get('/rooms', getRooms);

// Admin only — create a new room
router.post('/rooms', protect, adminOnly, [
  body('name').trim().notEmpty().withMessage('Room name is required').isLength({ max: 80 }),
  body('description').optional().isLength({ max: 200 }),
], createRoom);

/* ── Messages ───────────────────────────────────────────────── */

// Public — read messages
router.get('/rooms/:roomId/messages', getMessages);

// Authenticated — send a message
router.post('/rooms/:roomId/messages', protect, [
  body('text').trim().notEmpty().withMessage('Message text is required').isLength({ max: 1000 }),
], sendMessage);

// Authenticated (owner or admin) — soft-delete a message
router.delete('/rooms/:roomId/messages/:msgId', protect, deleteMessage);

export default router;
