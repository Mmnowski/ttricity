export const calculateDistance = (from, to) => {
  // calculates distance between 2 coordinates
  // output is in km
  const R = 6371;
  const d1 = from.lat * Math.PI / 180;
  const d2 = to.lat * Math.PI / 180;
  const deltaD = (to.lat - from.lat) * Math.PI / 180;
  const deltaLambda = (to.lon - from.lon) * Math.PI / 180;
  const a = Math.sin(deltaD / 2) * Math.sin(deltaD / 2) +
    Math.cos(d1) * Math.cos(d2) *
    Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
