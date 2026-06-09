import express from 'express';
import { body } from 'express-validator';
import {
  getCollections,
  createCollection,
  renameCollection,
  deleteCollection,
  toggleMovie,
  getSavedStatus,
} from '../controllers/collectionController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

// All collection endpoints require authentication
router.use(protect);

router.get('/',                     getCollections);
router.get('/saved/:movieId',       getSavedStatus);

router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }),
], createCollection);

router.put('/:id', [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }),
], renameCollection);

router.delete('/:id',              deleteCollection);
router.post('/:id/toggle',         toggleMovie);

export default router;
