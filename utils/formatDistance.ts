export const formatDistance = (km: number | null) => {
  if (km == null) return '0m';
  if (km < 1) return `${(km * 1000).toFixed(0)} m`;
  return `${km.toFixed(2)} km`;
};