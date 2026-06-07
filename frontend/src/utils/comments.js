/**
 * All comment data, helpers, and LIKERS_POOL have moved to movie.js.
 * This file re-exports them so existing imports keep working until you migrate them.
 */
export {
  ADMIN_USER,
  getCommentsForMovie,
  countAllComments,
} from './movie';
