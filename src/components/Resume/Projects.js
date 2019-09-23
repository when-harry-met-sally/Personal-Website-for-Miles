import React, { useState } from "react";
import { List, Card, Input, Divider, Image } from "semantic-ui-react";
import axios from "axios";
import { elastic } from "../../helpers/elastic";
function Projects() {
  const [repos, setRepos] = useState([]);
  const [filteredRepos, setFilteredRepos] = useState(repos);
  const getGithubRepos = () => {
    axios
      .get("https://api.github.com/users/miles-moran/repos", {
        headers: {
          Authorization: "Bearer " + githubKey
        }
      })
      .then(res => {
        setRepos(res.data); 
        setFilteredRepos(res.data);
      });
  };
  if (repos.length === 0) {
    getGithubRepos();
  }

  const handleFilter = e => {
    setFilteredRepos(elastic(e.target.value, repos, ["name", "language"]));
  };
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Input
            icon="github"
            placeholder="Search Github..."
            fluid
            onChange={e => handleFilter(e)}
            size={"mini"}
          ></Input>
        </Card.Header>
        <span>({filteredRepos.length}) Results</span>
      </Card.Content>

      <List divided relaxed className="github-list">
        {filteredRepos.length !== 0 ? (
          filteredRepos.map((repo, i) => (
            <>
              {i === 0 && <Divider />}
              <List.Item key={i} className="github-item">
                <List.Icon name="github" size="large" verticalAlign="middle" />
                <List.Content>
                  <List.Header href={repo.html_url}>
                    {repo.name} <span className="right">{repo.language}</span>
                  </List.Header>
                  <List.Description as="a">
                    Updated {Date(repo.updated_at)}
                  </List.Description>
                </List.Content>
              </List.Item>
            </>
          ))
        ) : (
          <>
            <Divider />
            <List.Item className="github-item">
              <Image
                avatar
                src={repos.length !== 0 && repos[0].owner.avatar_url}
              />
              <List.Content>
                <List.Header>Miles Moran</List.Header>
                <List.Description>
                  NO RESULTS. VISIT MY REPOSITORY
                </List.Description>
              </List.Content>
            </List.Item>
          </>
        )}
      </List>
    </Card>
  );
}

export default Projects;
