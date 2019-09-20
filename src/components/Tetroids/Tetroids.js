import React, { useState } from "react";
import Frame from "./Frame";
import initialPoints from "../../data/initialPoints";
import initialContainer from "../../data/initialContainer";
import { createGrid } from "../../helpers/createGrid";
import { differentiate } from "../../helpers/differentiate";
import { calculateMass } from "../../helpers/calculateMass";
import { shapeForm } from "../../helpers/shapeForm";
import * as _ from "lodash";
import { Grid, Button } from "semantic-ui-react";
import { solve } from "../../helpers/solve";
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
  const [container, setContainer] = useState(
    createGrid(width, height, initialContainer)
  );
  const [solved, setSolved] = useState(container);

  const [mass, setMass] = useState({
    shapes: calculateMass(coordinates),
    container: calculateMass(container)
  });

  const handleSetCoordinates = (x, y) => {
    const copy = _.cloneDeep(coordinates);
    copy[y][x].occupied = !copy[y][x].occupied;
    const diff = differentiate(copy);
    setCoordinates(copy);
    setDifferentiated(diff);
    setShapes(shapeForm(diff));
    setMass({
      ...mass,
      shapes: calculateMass(copy)
    });
  };

  const handleSetContainer = (x, y) => {
    const copy = _.cloneDeep(container);
    copy[y][x].occupied = !copy[y][x].occupied;
    setContainer(copy);
    setMass({
      ...mass,
      container: calculateMass(copy)
    });
  };

  const startSolve = () => {
    console.log(container);
    solve(container, shapes);
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
          <Grid.Column width={2}>
            <Frame
              width={width}
              height={height}
              coordinates={container}
              handleSetCoordinates={handleSetContainer}
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <Frame width={width} height={height} coordinates={solved} />
          </Grid.Column>
          <Grid.Column width={2}>
            <div>
              {mass.shapes} / {mass.container}
            </div>
            <Button primary onClick={startSolve}>
              Solve
            </Button>
          </Grid.Column>
        </Grid.Row>

        {shapes.map((shape, i) => (
          <Grid.Row key={i}>
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
