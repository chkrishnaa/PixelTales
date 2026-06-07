import { validationResult } from 'express-validator';
import Review from '../models/Review.js';

/**
 * GET /api/reviews
 * Get all non-deleted reviews — public.
 */
export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ isDeleted: false }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/reviews
 * Submit a review — each user (email) can only submit ONE review.
 */
export const submitReview = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, rating, review } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    // Enforce one review per user — including soft-deleted ones
    const existing = await Review.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: existing.isDeleted
          ? 'Your previous review was deleted. Please contact support to submit a new one.'
          : 'You have already submitted a review. You can edit or delete it from your profile.',
        reviewId: existing._id,
      });
    }

    const newReview = await Review.create({ name, email: normalizedEmail, rating, review });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully!',
      data: newReview,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/reviews/:id
 * Edit own review — verified by matching email.
 */
export const updateReview = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, rating, review } = req.body;
    const normalizedEmail = email.toLowerCase().trim();

    const existing = await Review.findById(req.params.id);

    if (!existing || existing.isDeleted) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (existing.email !== normalizedEmail) {
      return res.status(403).json({ success: false, message: 'You can only edit your own review' });
    }

    if (rating !== undefined) existing.rating = rating;
    if (review  !== undefined) existing.review  = review;

    await existing.save();

    res.json({
      success: true,
      message: 'Review updated successfully.',
      data: existing,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/reviews/:id
 * Soft-delete own review — verified by matching email.
 */
export const deleteReview = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required to delete a review' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await Review.findById(req.params.id);

    if (!existing || existing.isDeleted) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    if (existing.email !== normalizedEmail) {
      return res.status(403).json({ success: false, message: 'You can only delete your own review' });
    }

    existing.isDeleted = true;
    await existing.save();

    res.json({ success: true, message: 'Review deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/reviews/:id/like
 * Toggle like — requires login.
 */
export const likeReview = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const review = await Review.findById(req.params.id);
    if (!review || review.isDeleted)
      return res.status(404).json({ success: false, message: 'Review not found.' });

    const alreadyLiked    = review.likedBy.includes(userId);
    const alreadyDisliked = review.dislikedBy.includes(userId);

    if (alreadyLiked) {
      review.likedBy.pull(userId);
    } else {
      review.likedBy.push(userId);
      if (alreadyDisliked) review.dislikedBy.pull(userId);
    }
    await review.save();

    res.json({ success: true, likes: review.likedBy.length, dislikes: review.dislikedBy.length, liked: !alreadyLiked, disliked: false });
  } catch (err) { next(err); }
};

/**
 * POST /api/reviews/:id/dislike
 * Toggle dislike — requires login.
 */
export const dislikeReview = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const review = await Review.findById(req.params.id);
    if (!review || review.isDeleted)
      return res.status(404).json({ success: false, message: 'Review not found.' });

    const alreadyDisliked = review.dislikedBy.includes(userId);
    const alreadyLiked    = review.likedBy.includes(userId);

    if (alreadyDisliked) {
      review.dislikedBy.pull(userId);
    } else {
      review.dislikedBy.push(userId);
      if (alreadyLiked) review.likedBy.pull(userId);
    }
    await review.save();

    res.json({ success: true, likes: review.likedBy.length, dislikes: review.dislikedBy.length, liked: false, disliked: !alreadyDisliked });
  } catch (err) { next(err); }
};

/**
 * GET /api/reviews/me
 * Check if a user has already submitted a review (by email query param).
 */
export const getMyReview = async (req, res, next) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email query param is required' });
    }

    const existing = await Review.findOne({
      email: email.toLowerCase().trim(),
      isDeleted: false,
    });

    res.json({
      success: true,
      hasReview: !!existing,
      data: existing || null,
    });
  } catch (err) {
    next(err);
  }
};
