import * as _ from "lodash";
import { shrink } from "./shrink";

export const solve = (container, shapes) => {
  console.log(shapes);
  console.log("solving");
  shapes = _.cloneDeep(shapes);
  container = _.cloneDeep(container);
  container = shrink(container, true);
  shapes.forEach(shape => {
    generatePositions(container, shape);
  });
  if (shapes.length === 0) {
    return null;
  }
  let allPositions;
  for (let s0 = 0; s0 < shapes[0].positions.length; s0++) {
    allPositions = [...shapes[0].positions[s0]];
    if (collisionsTest(allPositions)) {
      continue;
    } else {
      if (shapes.length === 1 && allPositions.length === container.length) {
        return allPositions;
      }
      for (let s1 = 0; s1 < shapes[1].positions.length; s1++) {
        allPositions = [...shapes[0].positions[s0], ...shapes[1].positions[s1]];
        if (collisionsTest(allPositions)) {
          continue;
        }
        if (shapes.length === 2 && allPositions.length === container.length) {
          return allPositions;
        }
        for (let s2 = 0; s2 < shapes[2].positions.length; s2++) {
          allPositions = [
            ...shapes[0].positions[s0],
            ...shapes[1].positions[s1],
            ...shapes[2].positions[s2]
          ];
          if (collisionsTest(allPositions)) {
            continue;
          }
          if (shapes.length === 3 && allPositions.length === container.length) {
            return allPositions;
          }
          for (let s3 = 0; s3 < shapes[3].positions.length; s3++) {
            allPositions = [
              ...shapes[0].positions[s0],
              ...shapes[1].positions[s1],
              ...shapes[2].positions[s2],
              ...shapes[3].positions[s3]
            ];
            if (collisionsTest(allPositions)) {
              continue;
            }
            if (
              shapes.length === 4 &&
              allPositions.length === container.length
            ) {
              return allPositions;
            }
            for (let s4 = 0; s4 < shapes[4].positions.length; s4++) {
              allPositions = [
                ...shapes[0].positions[s0],
                ...shapes[1].positions[s1],
                ...shapes[2].positions[s2],
                ...shapes[3].positions[s3],
                ...shapes[4].positions[s4]
              ];
              if (collisionsTest(allPositions)) {
                continue;
              }
              if (
                shapes.length === 5 &&
                allPositions.length === container.length
              ) {
                return allPositions;
              }
              for (let s5 = 0; s5 < shapes[5].positions.length; s5++) {
                allPositions = [
                  ...shapes[0].positions[s0],
                  ...shapes[1].positions[s1],
                  ...shapes[2].positions[s2],
                  ...shapes[3].positions[s3],
                  ...shapes[4].positions[s4],
                  ...shapes[5].positions[s5]
                ];
                if (collisionsTest(allPositions)) {
                  continue;
                }
                if (
                  shapes.length === 6 &&
                  allPositions.length === container.length
                ) {
                  return allPositions;
                }
              }
            }
          }
        }
      }
    }
  }
  return null;
};

const generatePositions = (container, shape) => {
  const positions = [];
  for (
    let containerPoint = 0;
    containerPoint < container.length;
    containerPoint++
  ) {
    for (let permutation = 0; permutation < shape.length; permutation++) {
      const location = placePoint(
        container,
        container[containerPoint],
        shape[permutation]
      );
      if (location) {
        positions.push(location);
      }
    }
  }
  shape.positions = positions;
};

const isWithinBounds = (container, point) => {
  for (
    let containerPoint = 0;
    containerPoint < container.length;
    containerPoint++
  ) {
    const cPoint = container[containerPoint];
    if (cPoint.x === point.x && cPoint.y === point.y) {
      return true;
    }
  }
  return false;
};

const placePoint = (container, origin, permutation) => {
  const placement = [];
  for (let p = 0; p < permutation.length; p++) {
    const pX = permutation[p].x + origin.x;
    const pY = permutation[p].y + origin.y;
    const newPoint = { x: pX, y: pY, occupied: permutation[p].occupied };
    if (isWithinBounds(container, newPoint)) {
      placement.push(newPoint);
    } else {
      return null;
    }
  }
  return placement;
};

const collisionsTest = allPositions => {
  for (let i = 0; i < allPositions.length; i++) {
    for (let j = 0; j < allPositions.length; j++) {
      if (i !== j) {
        const iPoint = allPositions[i];
        const jPoint = allPositions[j];
        if (iPoint.x === jPoint.x && iPoint.y === jPoint.y) {
          return true;
        }
      }
    }
  }
  return false;
};
