import React, { useState } from "react";
import Frame from "./Frame";

function Tetroids() {
  const [points, setPoints] = useState();
  return (
    <div>
      <Frame width={4} height={4} />
      <br />
      <Frame width={4} height={4} />
    </div>
  );
}

export default Tetroids;
