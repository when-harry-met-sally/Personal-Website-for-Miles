export const calculateMass = grid => {
  let count = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x].occupied) {
        count++;
      }
    }
  }
  return count;
};
