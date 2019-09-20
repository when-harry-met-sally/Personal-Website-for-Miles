import React, { useState } from "react";
import Frame from "./Frame";
import initialPoints from "../../data/initialPoints";
import { createGrid } from "../../helpers/createGrid";
import { differentiate } from "../../helpers/differentiate";
import { shapeForm } from "../../helpers/shapeForm";
import * as _ from "lodash";
import { Grid } from "semantic-ui-react";
function Tetroids() {
  const width = 5;
  const height = 5;
  const [coordinates, setCoordinates] = useState(
    createGrid(width, height, initialPoints)
  );
  const [differentiated, setDifferentiated] = useState(
    differentiate(coordinates)
  );
  const [shapes, setShapes] = useState(shapeForm(differentiated));
  const handleSetCoordinates = (x, y) => {
    const copy = _.cloneDeep(coordinates);
    copy[y][x].occupied = !copy[y][x].occupied;
    const diff = differentiate(copy);
    setCoordinates(copy);
    setDifferentiated(diff);
    setShapes(shapeForm(diff));
  };
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Frame
              width={width}
              height={height}
              coordinates={coordinates}
              handleSetCoordinates={handleSetCoordinates}
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <Frame width={width} height={height} coordinates={differentiated} />
          </Grid.Column>
        </Grid.Row>

        {shapes.map(shape => (
          <Grid.Row>
            {" "}
            {shape.map((permutation, j) => (
              <Grid.Column width={2} key={j}>
                <Frame
                  width={width}
                  height={height}
                  coordinates={createGrid(width, height, permutation)}
                />
                <br />
              </Grid.Column>
            ))}
          </Grid.Row>
        ))}
      </Grid>
    </div>
  );
}

export default Tetroids;
