import { generateRotations } from "./generateRotations";

export const shapeForm = (grid, container) => {
  const shapeMap = {};
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const point = grid[y][x];
      if (point.occupied) {
        if (!shapeMap[point.occupied]) {
          shapeMap[point.occupied] = [];
        }
        shapeMap[point.occupied].push(point);
      }
    }
  }
  const shapes = [];
  if (container) {
    const containers = Object.values(shapeMap);
    if (containers.length !== 1) {
      return null;
    }
    return containers[0];
  }
  Object.values(shapeMap).forEach(shape =>
    shapes.push(generateRotations(shape))
  );
  return shapes;
};
