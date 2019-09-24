import React, { useState } from "react";
import Nav from "./Nav";
import Tetroids from "./Tetroids/Tetroids";
import { Container } from "semantic-ui-react";
import Resume from "./Resume/Resume";
import Home from "./Home";

function Main() {
  const [activeItem, setActiveItem] = useState("home");
  const handleNavClick = destination => {
    setActiveItem(destination);
  };
  let content;
  switch (activeItem) {
    case "home":
      content = <Home />;
      break;
    case "resume":
      content = <Resume />;
      break;
    case "tetroids":
      content = <Tetroids />;
      break;
    default:
      content = <Home />;
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
