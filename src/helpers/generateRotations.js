import { shrink }  from "./shrink";

export const generateRotations = points => {
  let permutations = [];
  const signs = [-1, 1];
  for (let reverse = 0; reverse < 2; reverse++) {
    for (let ySign = 0; ySign < signs.length; ySign++) {
      for (let xSign = 0; xSign < signs.length; xSign++) {
        let permutation = [];
        points.forEach(point => {
          const newX = point.x * signs[xSign];
          const newY = point.y * signs[ySign];
          const newPoint = reverse
            ? {
                x: newX,
                y: newY,
                occupied: point.occupied
              }
            : {
                x: newY,
                y: newX,
                occupied: point.occupied
              };
          permutation.push(newPoint);
        });
        console.log(permutation);
        shrink(sortPoints(permutation));
        if (!isRepeatPermutation(permutations, permutation)) {
          permutations.push(permutation);
        }
      }
    }
  }

  return permutations;
};

const sortPoints = points => {
  points = points.sort((a, b) => {
    if (a.y > b.y) {
      return 1;
    } else if (a.y < b.y) {
      return -1;
    } else if (a.y === b.y) {
      if (a.x > b.x) {
        return 1;
      } else {
        return -1;
      }
    }
  });
  return points;
};

const isRepeatPermutation = (permutations, permutation) => {
  for (let p = 0; p < permutations.length; p++) {
    if (stringify(permutations[p]) === stringify(permutation)) {
      return true;
    }
  }
  return false;
};

const stringify = points => {
  let string = "";
  points.forEach(point => {
    string += "(" + point.x + "," + point.y + ")";
  });
  return string;
};
