import React from "react";
import { Menu, Container, Grid, Header } from "semantic-ui-react";

function Nav({activeItem, handleNavClick}) {
  return (
    <Menu fluid pointing secondary>
      <Container>
        <Grid>
          <Grid.Row>
            <Menu.Item className="menu-name">
              <Header as="h2">Miles Moran</Header>
            </Menu.Item>
          </Grid.Row>
          <Grid.Row>
            <Menu.Item
              name="Home"
              as="a"
              active={activeItem === "home"}
              onClick={() => handleNavClick("home")}
            />
            <Menu.Item
              name="Résumé"
              as="a"
              active={activeItem === "resume"}
              onClick={() => handleNavClick("resume")}
            >
              Résumé
            </Menu.Item>
            <Menu.Item
              name="Projects"
              as="a"
              active={activeItem === "projects"}
              onClick={() => handleNavClick("projects")}
            />
                 <Menu.Item
              name="Puzzle Solver"
              as="a"
              active={activeItem === "tetroids"}
              onClick={() => handleNavClick("tetroids")}
            />
          </Grid.Row>
        </Grid>
      </Container>
    </Menu>
  );
}

export default Nav;
