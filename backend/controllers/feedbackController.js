import { validationResult } from 'express-validator';
import Feedback from '../models/Feedback.js';

/**
 * POST /api/feedback
 * Submit feedback — any user can submit multiple times.
 * No edit or delete allowed after submission.
 */
export const submitFeedback = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

const { feedbackType, sentiment, message } = req.body;

    const feedback = await Feedback.create({
      name: req.user.name,
      email: req.user.email.toLowerCase().trim(),
      avatar: req.user.avatar,
      feedbackType,
      sentiment,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Feedback submitted successfully. Thank you!',
      data: feedback,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/feedback
 * Get all feedbacks — admin use.
 * Supports query: ?status=pending|reviewed|resolved  ?type=bug|feature...
 */
export const getAllFeedback = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.type)   filter.feedbackType = req.query.type;

    const feedbacks = await Feedback.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/feedback/mine?email=
 * Returns all feedback submitted by a given email (newest first).
 */
export const getMyFeedback = async (req, res, next) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email query param is required' });
    }

    const feedbacks = await Feedback.find({
      email: email.toLowerCase().trim(),
    }).sort({ createdAt: -1 });

    res.json({ success: true, count: feedbacks.length, data: feedbacks });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/feedback/:id
 * Delete own feedback — verified by matching email in body.
 */
export const deleteFeedback = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required to delete feedback' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }

    if (feedback.email !== normalizedEmail) {
      return res.status(403).json({ success: false, message: 'You can only delete your own feedback' });
    }

    await feedback.deleteOne();

    res.json({ success: true, message: 'Feedback deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

/**
 * PATCH /api/feedback/:id/status
 * Admin: update the status of a feedback (pending → reviewed → resolved).
 */
export const updateFeedbackStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'reviewed', 'resolved'];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowed.join(', ')}`,
      });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!feedback) {
      return res.status(404).json({ success: false, message: 'Feedback not found' });
    }

    res.json({ success: true, data: feedback });
  } catch (err) {
    next(err);
  }
};
