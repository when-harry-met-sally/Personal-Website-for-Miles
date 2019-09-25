import React, { useState } from "react";
import Nav from "./Nav";
import Tetroids from "./Tetroids/Tetroids";
import { Container } from "semantic-ui-react";
import Resume from "./Resume/Resume";
import Highlight from "./Highlight/Highlight";

function Main() {
  const [activeItem, setActiveItem] = useState("resume");
  const handleNavClick = destination => {
    setActiveItem(destination);
  };
  let content;
  switch (activeItem) {
    case "highlight":
      content = <Highlight/>
      break;
    case "resume":
      content = <Resume />;
      break;
    case "tetroids":
      content = <Tetroids />;
      break;
    default:
      content = <Resume />;
      break;
  }
  return (
    <>
      <Nav activeItem={activeItem} handleNavClick={handleNavClick} />
      <Container>{content}</Container>
    </>
  );
}

export default Main;
