import User from "../models/User.js";
import Review from "../models/Review.js";
import Feedback from "../models/Feedback.js";
import Movie from "../models/Movie.js";
import MovieStat from "../models/MovieStat.js";
import WatchRecord from "../models/WatchRecord.js";
import Collection from "../models/Collection.js";

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
      totalMovies,
      engagementAgg,
      watchStatsAgg,
      totalCollections,
    ] = await Promise.all([
      User.countDocuments(),
      Review.countDocuments({ isDeleted: false }),
      Feedback.countDocuments(),
      Movie.countDocuments(),

      MovieStat.aggregate([
        {
          $project: {
            likes: { $size: { $ifNull: ["$likedBy", []] } },
            comments: { $ifNull: ["$commentsCount", 0] },
          },
        },
        {
          $group: {
            _id: null,
            totalEngagement: {
              $sum: {
                $add: ["$likes", "$comments"],
              },
            },
          },
        },
      ]),

      WatchRecord.aggregate([
        {
          $group: {
            _id: null,
            totalWatchedSeconds: {
              $sum: { $ifNull: ["$watchedSeconds", 0] },
            },
            videosWatched: { $sum: 1 },
          },
        },
      ]),

      Collection.countDocuments(),
    ]);

    const engagement = engagementAgg[0]?.totalEngagement ?? 0;

    const totalWatchedSeconds = watchStatsAgg[0]?.totalWatchedSeconds ?? 0;

    const videosWatched = watchStatsAgg[0]?.videosWatched ?? 0;

    const averageWatchTime =
      totalUsers > 0 ? Math.round(totalWatchedSeconds / totalUsers) : 0;

    res.json({
      success: true,
      data: {
        totalUsers,
        totalReviews,
        totalFeedback,
        totalMovies,
        engagement,
        averageWatchTime,
        videosWatched,
        totalCollections,
      },
    });
  } catch (err) {
    next(err);
  }
};
