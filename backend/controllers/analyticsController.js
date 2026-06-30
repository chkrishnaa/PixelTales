import User      from '../models/User.js';
import Review    from '../models/Review.js';
import Feedback  from '../models/Feedback.js';
import MovieStat from '../models/MovieStat.js';

/**
 * GET /api/analytics
 * Public — returns aggregate platform stats for the Home page analytics section.
 */
export const getAnalytics = async (_req, res, next) => {
  try {
    const [
      totalUsers,
      totalReviews,
      totalFeedback,
      videoStatsAgg,
    ] = await Promise.all([
      User.countDocuments(),
      Review.countDocuments({ isDeleted: false }),
      Feedback.countDocuments(),
      // Sum all comment counts across all movies as a "videos engaged" proxy
      MovieStat.aggregate([
        { $group: { _id: null, total: { $sum: '$commentsCount' } } },
      ]),
    ]);

    const videosWatched = videoStatsAgg[0]?.total ?? 0;

    res.json({
      success: true,
      data: {
        totalUsers,
        totalReviews,
        totalFeedback,
        videosWatched,
      },
    });
  } catch (err) {
    next(err);
  }
};
