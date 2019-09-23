import React, { useState } from "react";
import Nav from "./Nav";
import Tetroids from "./Tetroids/Tetroids";
import { Container } from "semantic-ui-react";
import Resume from "./Resume/Resume";

function Main() {
  const [activeItem, setActiveItem] = useState("home");
  const handleNavClick = destination => {
    setActiveItem(destination);
  };
  let content;
  switch (activeItem) {
    case "home":
      content = <Tetroids />;
      break;
    case "resume":
      content = <Resume/>
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
