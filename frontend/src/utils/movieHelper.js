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

export const iterateGalleryImages = (gallery) => {
  if (Array.isArray(gallery)) {
    return gallery;
  }

  if (typeof gallery !== "string" || !gallery.trim()) {
    return [];
  }

  const match = gallery.match(/\[---(\d+)---\]/);

  if (!match) {
    return [gallery];
  }

  const end = Number(match[1]);

  if (end < 1) {
    return [];
  }

  return Array.from({ length: end }, (_, index) =>
    gallery.replace(match[0], String(index + 1)),
  );
};