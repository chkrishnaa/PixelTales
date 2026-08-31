export function countAllComments(comments) {
  return (comments ?? []).reduce(
    (total, comment) => total + 1 + countAllComments(comment.replies ?? []),
    0,
  );
}

export function getMovieTitle(movie) {
  if (!movie) return "";
  return Array.isArray(movie.title) ? movie.title[0] : (movie.title ?? "");
}
