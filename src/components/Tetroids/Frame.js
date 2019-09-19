import React, { useState } from "react";

function Frame({ width, height, coordinates, handleSetCoordinates }) {
  let Grid = ({ children }) => <div className="shape-grid">{children}</div>;
  let rows = [];
  for (let y = 0; y < height; y++) {
    const Row = ({ children }) => <div className="shape-row">{children}</div>;
    let row = [];
    for (let x = 0; x < width; x++) {
      row.push(
        <span key={x}
          className={coordinates[y][x].occupied ? "square red" : "square clear"}
          onClick={() => handleSetCoordinates && handleSetCoordinates(x, y)}
        />
      );
    }
    rows.push(<Row key={y}>{row}</Row>);
  }
  return <Grid>{rows}</Grid>;
}

export default Frame;
