import React from "react";
import ResumeFile from "./ResumeFile";
import Projects from "./Projects";
import { Grid } from "semantic-ui-react";

function Resume() {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={11}>
          <ResumeFile />
        </Grid.Column>
        <Grid.Column width={5}>
          <Projects />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default Resume;
