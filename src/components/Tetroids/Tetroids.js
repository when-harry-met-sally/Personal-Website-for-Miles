import React, { useState } from "react";
import Frame from "./Frame";
import initialPoints from "../../data/initialPoints";
import { createGrid } from "../../helpers/createGrid";
import { differentiate } from "../../helpers/differentiate";
import { shapeForm } from "../../helpers/shapeForm";
import * as _ from "lodash";
import { Grid } from "semantic-ui-react";
import { generateRotations } from "../../helpers/generateRotations";
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
  console.log(generateRotations(shapes[0]));
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
        <Grid.Row>
          {shapes.map((shape, i) => {
            return (
              <Grid.Column width={2} key={i}>
                <Frame
                  width={width}
                  height={height}
                  coordinates={createGrid(width, height, shape)}
                />
                <br />
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Tetroids;
