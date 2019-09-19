import * as _ from "lodash";
export const differentiate = grid => {
  grid = _.cloneDeep(grid);
  let count = 0;
  findNeighbors(grid, count);
  return grid;
};

const findNeighbors = grid => {
  let count = 1;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const point = grid[y][x];
      if (point.occupied === true) {
        point.occupied = count;
        count++;
        grid = groupNeighbors(grid, point);
      }
    }
  }
  return grid;
};

const groupNeighbors = (grid, point) => {
  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 }
  ];
  for (let i = 0; i < directions.length; i++) {
    const newX = point.x + directions[i].x;
    const newY = point.y + directions[i].y;
    if (
      !(newX < 0 || newY < 0 || newX === grid[0].length || newY === grid.length)
    ) {
      const newPoint = grid[newY][newX];
      if (newPoint.occupied === true) {
        newPoint.occupied = point.occupied;
        grid = groupNeighbors(grid, newPoint);
      }
    }
  }
  return grid;
};
