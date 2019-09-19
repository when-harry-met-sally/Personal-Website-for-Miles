import React from "react";
import { Menu, Container, Grid, Header } from "semantic-ui-react";
function Nav() {
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
            <Menu.Item name="Home" as="a" active />
            <Menu.Item name="Projects" as="a" />
            <Menu.Item name="Résumé" as="a" >Résumé</Menu.Item>
          </Grid.Row>
        </Grid>
      </Container>
    </Menu>
  );
}

export default Nav;
