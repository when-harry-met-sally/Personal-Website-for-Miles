import React, { useState } from "react";
import initialPoints from "../../data/initialPoints";
import { createGrid } from "../../helpers/createGrid";

function Frame({ width, height }) {
  const [coordinates, setCoordinates] = useState(
    createGrid(width, height, initialPoints)
  );
  let Grid = ({ children }) => <div className="shape-grid">{children}</div>;
  let rows = [];
  const handleCoordinateClick = (x, y) => {
    const copy = [...coordinates];
    copy[y][x].occupied = !copy[y][x].occupied;
    setCoordinates(copy);
  };
  for (let y = 0; y < height; y++) {
    const Row = ({ children }) => <div className="shape-row">{children}</div>;
    let row = [];
    for (let x = 0; x < width; x++) {
      row.push(
        <span
          className={coordinates[y][x].occupied ? "square red" : "square clear"}
          onClick={() => handleCoordinateClick(x, y)}
        />
      );
    }
    rows.push(<Row>{row}</Row>);
  }

  return <Grid>{rows}</Grid>;
}

export default Frame;
