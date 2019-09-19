import React from "react";
import Projects from "./Projects";
import { Container, Card } from "semantic-ui-react";
import Tetroids from "./Tetroids/Tetroids";

function Content() {
  return (
    <Container>
      <Tetroids/>
    </Container>
  );
}

export default Content;
