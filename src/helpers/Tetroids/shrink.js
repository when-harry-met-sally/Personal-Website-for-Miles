const flatten = points => {
  const flattened = [];
  for (let y = 0; y < points.length; y++) {
    for (let x = 0; x < points[y].length; x++) {
      const point = points[y][x];
      if (point.occupied) {
        flattened.push(point);
      }
    }
  }
  return flattened;
};

export const shrink = (points, canvas) => {
  if (canvas) {
    points = flatten(points);
  }
  const xCords = [];
  const yCords = [];
  points.forEach(point => {
    xCords.push(point.x);
    yCords.push(point.y);
  });
  const xMin = Math.min.apply(null, xCords);
  const yMin = Math.min.apply(null, yCords);
  points.forEach(point => {
    if (xMin !== 0) {
      point.x -= xMin;
    }
    if (yMin !== 0) {
      point.y -= yMin;
    }
  });
  return points;
};

export const unshrink = (grid, points) => {
  const flattened = flatten(grid);
  const xCords = [];
  const yCords = [];
  flattened.forEach(point => {
    xCords.push(point.x);
    yCords.push(point.y);
  });
  const xMin = Math.min.apply(null, xCords);
  const yMin = Math.min.apply(null, yCords);
  points.forEach(point => {
    point.x += xMin;
    point.y += yMin;
  });
  return points;
};
