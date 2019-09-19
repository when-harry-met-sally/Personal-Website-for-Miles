import * as _ from "lodash";
export const differentiate = grid => {
  console.log(grid);
  grid = _.cloneDeep(grid);
  let count = 0;
  findNeighbors(grid, count);
  return grid;
};

const findNeighbors = (grid, count) => {
  console.log("test");
  let original = true;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const point = grid[y][x];
      if (point.occupied !== false) {
        if (original && point.occupied === true) {
          point.occupied = count;
          original = false;
        }
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
            !(
              newX < 0 ||
              newY < 0 ||
              newX === grid[y].length ||
              newY === grid.length
            )
          ) {
            if (
              grid[newY][newX].occupied === true &&
              point.occupied !== true &&
              point.occupied !== false
            ) {
              grid[newY][newX].occupied = point.occupied;
            } else if (
              point.occupied === true &&
              grid[newY][newX].occupied !== false &&
              grid[newY][newX].occupied !== true
            ) {
              point.occupied = grid[newY][newX].occupied;
            }
          }
        }
      }
    }
  }
  if (original) {
    grid = findNeighbors(grid, count + 1);
  }
  console.log(grid);
  return grid;
};
