import { generateRotations } from "./generateRotations";

export const shapeForm = grid => {
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
  Object.values(shapeMap).forEach(shape => shapes.push(generateRotations(shape)));
  return shapes;
};
