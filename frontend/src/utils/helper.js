export const formatDuration = (minutes) => {
  if (!minutes || minutes <= 0) return null;

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;

  return `${hours}h ${mins}m`;
};

export function formatWatchTime(seconds) {
  if (seconds == null || Number.isNaN(Number(seconds))) {
    return "—";
  }

  seconds = Math.max(0, Math.round(Number(seconds)));

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m`;

  return `${seconds}s`;
}

export function formatNumber(n) {
  if (n == null || Number.isNaN(Number(n))) return "—";

  n = Number(n);

  // Keep numbers below 1,000 as-is
  if (n < 1000) {
    return String(n);
  }

  // Crore
  if (n >= 10_000_000) {
    return `${(n / 10_000_000).toFixed(1).replace(/\.0$/, "")}Cr+`;
  }

  // Million
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M+`;
  }

  // Thousand
  return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K+`;
}