import { validationResult } from 'express-validator';
import Collection from '../models/Collection.js';

/* ── GET /api/collections ────────────────────────────────────
   Returns all collections owned by the current user.
*/
export const getCollections = async (req, res, next) => {
  try {
    const collections = await Collection.find({ userId: req.user._id })
      .sort({ updatedAt: -1 });
    res.json({ success: true, data: collections });
  } catch (err) { next(err); }
};

/* ── POST /api/collections ───────────────────────────────────
   Create a new (empty) collection. Optionally seed with a movieId.
   Body: { name, movieId? }
*/
export const createCollection = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const { name, movieId } = req.body;
    const movieIds = movieId ? [movieId] : [];

    const collection = await Collection.create({
      userId: req.user._id,
      name:   name.trim(),
      movieIds,
    });

    res.status(201).json({ success: true, data: collection });
  } catch (err) {
    // Duplicate name
    if (err.code === 11000)
      return res.status(409).json({
        success: false,
        message: 'You already have a collection with that name.',
      });
    next(err);
  }
};

/* ── PUT /api/collections/:id ────────────────────────────────
   Rename a collection.
   Body: { name }
*/
export const renameCollection = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const col = await Collection.findOne({ _id: req.params.id, userId: req.user._id });
    if (!col)
      return res.status(404).json({ success: false, message: 'Collection not found.' });

    col.name = req.body.name.trim();
    await col.save();

    res.json({ success: true, data: col });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ success: false, message: 'Name already taken.' });
    next(err);
  }
};

/* ── DELETE /api/collections/:id ─────────────────────────────
   Delete a collection entirely.
*/
export const deleteCollection = async (req, res, next) => {
  try {
    const col = await Collection.findOneAndDelete({
      _id:    req.params.id,
      userId: req.user._id,
    });
    if (!col)
      return res.status(404).json({ success: false, message: 'Collection not found.' });

    res.json({ success: true, message: 'Collection deleted.' });
  } catch (err) { next(err); }
};

/* ── POST /api/collections/:id/toggle ───────────────────────
   Add movie if not present, remove if already present (toggle).
   Body: { movieId }
*/
export const toggleMovie = async (req, res, next) => {
  try {
    const { movieId } = req.body;
    if (!movieId)
      return res.status(400).json({ success: false, message: 'movieId is required.' });

    const col = await Collection.findOne({ _id: req.params.id, userId: req.user._id });
    if (!col)
      return res.status(404).json({ success: false, message: 'Collection not found.' });

    const alreadySaved = col.movieIds.includes(movieId);
    if (alreadySaved) {
      col.movieIds = col.movieIds.filter((id) => id !== movieId);
    } else {
      col.movieIds.push(movieId);
    }
    await col.save();

    res.json({
      success: true,
      saved:   !alreadySaved,
      data:    col,
    });
  } catch (err) { next(err); }
};

/* ── GET /api/collections/saved/:movieId ─────────────────────
   Returns which of the user's collections contain this movieId.
*/
export const getSavedStatus = async (req, res, next) => {
  try {
    const collections = await Collection.find({ userId: req.user._id })
      .sort({ updatedAt: -1 });

    const result = collections.map((c) => ({
      _id:   c._id,
      name:  c.name,
      count: c.movieIds.length,
      saved: c.movieIds.includes(req.params.movieId),
    }));

    res.json({ success: true, data: result });
  } catch (err) { next(err); }
};
