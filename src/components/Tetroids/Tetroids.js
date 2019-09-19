import React, { useState } from "react";
import Frame from "./Frame";
import initialPoints from "../../data/initialPoints";
import { createGrid } from "../../helpers/createGrid";
import { differentiate } from "../../helpers/differentiate";
import * as _ from 'lodash';
function Tetroids() {
  const width = 5;
  const height = 5;
  const [coordinates, setCoordinates] = useState(
    createGrid(width, height, initialPoints)
  );
  const [diffCoordinates, setDiffCoordinates] = useState(coordinates);

  const handleSetCoordinates = (x, y) => {
    const copy = _.cloneDeep(coordinates);
    copy[y][x].occupied = !copy[y][x].occupied;
    setCoordinates(copy);
    setDiffCoordinates(differentiate(copy));;
  };
  return (
    <div>
      <Frame
        width={width}
        height={height}
        coordinates={coordinates}
        handleSetCoordinates={handleSetCoordinates}
    
      />
      <br />
      <Frame
        width={width}
        height={height}
        coordinates={diffCoordinates}
      />
    </div>
  );
}

export default Tetroids;
