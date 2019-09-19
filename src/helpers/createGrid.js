const arrayContainsPoint = (point, array) => {
  for (let i = 0; i < array.length; i++) {
    const pointInArray = array[i];
    if (pointInArray.x === point.x && pointInArray.y === point.y) {
      return true;
    }
  }
  return false;
};

export const createGrid = (height, width, coordinates) => {
  let cords = [];
  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      const occupied = arrayContainsPoint({ x, y }, coordinates);
      row.push({
        x: x,
        y: y,
        occupied
      });
    }
    cords.push(row);
  }

  return cords;
};
