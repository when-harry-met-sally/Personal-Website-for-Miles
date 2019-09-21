import React from "react";

function Frame({
  width,
  height,
  coordinates,
  handleSetCoordinates,
  styling,
  hover
}) {
  let Grid = ({ children }) => <div className="shape-grid">{children}</div>;
  let rows = [];
  for (let y = 0; y < height; y++) {
    const Row = ({ children }) => <div className={styling.row}>{children}</div>;
    let row = [];
    for (let x = 0; x < width; x++) {
      let squareStyling = "";
      if (!coordinates[y][x].occupied) {
        squareStyling += styling.square + " clear";
      } else {
        if (coordinates[y][x].occupied === true) {
          squareStyling += styling.square + " black";
        } else {
          squareStyling =
            styling.square + " shape-" + coordinates[y][x].occupied;
        }
      }
      if (hover && !coordinates[y][x].occupied){
        squareStyling += ' square-hover'
      }
      row.push(
        <span
          key={x}
          className={squareStyling}
          onClick={() => handleSetCoordinates && handleSetCoordinates(x, y)}
        />
      );
    }
    rows.push(<Row key={y}>{row}</Row>);
  }
  return <Grid>{rows}</Grid>;
}

export default Frame;
