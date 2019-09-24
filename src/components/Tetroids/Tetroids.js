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
      <Grid centered>
        <Grid.Row>
          <Grid.Column width={8}>
            <Message color={"teal"} className="height-hundred-percent">
              <Message.Header>Polyomino Solver: JavaScript</Message.Header>
              <Message.Content>
                <div>
                  This polyomino packing puzzle solver written in JavaScript.{" "}
                </div>
                <div>1) &nbsp; &nbsp;Create shapes in box one.</div>
                <div>2) &nbsp; &nbsp;Create a container in box two.</div>
                <div>3) &nbsp; &nbsp;Solve!</div>
              </Message.Content>
            </Message>
          </Grid.Column>
          <Grid.Column width={8}>
            <Message color={"blue"} className="height-hundred-percent">
              <Message.Header>How It Works:</Message.Header>
              <Message.Content>
                <div>
                  The program takes the shapes as points on a coordinate plane.
                  It then finds the ways the shapes can be rotated. It then
                  brute forces its way through every way the shapes can be
                  rearranged until it finds a combination that fits.{" "}
                </div>
                <div>
                  {mass.shapes} / {mass.container}
                </div>
                <Button
                  primary
                  onClick={startSolve}
                  disabled={mass.shapes !== mass.container}
                >
                  Solve
                </Button>
              </Message.Content>
            </Message>
          </Grid.Column>
        </Grid.Row>
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
            <Message color={"yellow"} className="frame-message">
              Create Shapes
            </Message>
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
            <Message color={"yellow"} className="frame-message">
              Create a Container
            </Message>
          </Grid.Column>
          <Grid.Column width={4}>
            <Frame
              width={width}
              height={height}
              coordinates={differentiated}
              styling={{ row: "large-row", square: "square large" }}
            />
            <Message color={"yellow"} className="frame-message">
              Differentiated Shapes
            </Message>
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
          <Grid.Row centered key={i}>
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
  );
}

export default Tetroids;
