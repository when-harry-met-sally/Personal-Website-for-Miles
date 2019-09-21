import React, { useState, useEffect } from "react";
import Frame from "./Frame";
import initialPoints from "../../data/initialPoints";
import initialContainer from "../../data/initialContainer";
import { createGrid } from "../../helpers/createGrid";
import { differentiate } from "../../helpers/differentiate";
import { calculateMass } from "../../helpers/calculateMass";
import { shapeForm } from "../../helpers/shapeForm";
import * as _ from "lodash";
import { Grid, Button, Message } from "semantic-ui-react";
import { solve } from "../../helpers/solve";
import { unshrink } from "../../helpers/shrink";
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
  useEffect(() => {
    setSolved(
      createGrid(width, height, unshrink(container, solve(container, shapes)))
    );
  }, []);
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
    console.log("STARTSOLVE");
    if (mass.shapes !== mass.container) {
      return;
    }
    let solution = solve(container, shapes);
    if (solution) {
      solution = unshrink(container, solution);
      setSolved(createGrid(width, height, solution));
    } else {
      setSolved(null);
    }
  };
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Frame
              width={width}
              height={height}
              coordinates={coordinates}
              handleSetCoordinates={handleSetCoordinates}
              styling={{ row: "large-row", square: "square large" }}
              hover={true}
            />
            <Message className="frame-message">Create Shapes</Message>
          </Grid.Column>
          <Grid.Column width={4}>
            <Frame
              width={width}
              height={height}
              coordinates={differentiated}
              styling={{ row: "large-row", square: "square large" }}
            />
            <Message className="frame-message">Differentiated Shapes</Message>
          </Grid.Column>
          <Grid.Column width={4}>
            <Frame
              width={width}
              height={height}
              coordinates={container}
              handleSetCoordinates={handleSetContainer}
              styling={{ row: "large-row", square: "square large" }}
              hover={true}
            />
            <Message className="frame-message">Create a Container</Message>
          </Grid.Column>
          <Grid.Column width={4}>
            <Frame
              width={width}
              height={height}
              coordinates={solved ? solved : createGrid(width, height, [])}
              styling={{ row: "large-row", square: "square large" }}
            />
            <Message
              negative={!solved}
              positive={solved}
              className="frame-message"
            >
              {solved ? "Solved Puzzle" : "No Solution"}
            </Message>
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
                  styling={{ row: "small-row", square: "square small" }}
                />
                <br />
              </Grid.Column>
            ))}
          </Grid.Row>
        ))}
      </Grid>

      <div>
        {mass.shapes} / {mass.container}
      </div>
      <Button primary onClick={startSolve}>
        Solve
      </Button>
    </div>
  );
}

export default Tetroids;
