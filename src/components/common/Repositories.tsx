import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import axios from "axios";
import { Repository } from "../../types/Repository";
import styled from "styled-components";
import { BsStarFill } from "react-icons/bs";
import { FaCodeBranch } from "react-icons/fa";
import { User } from "../../types/User";

const RepositoryContainer = styled.div`
  text-align: left;
`;

const RepositoryName = styled(Link)`
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-decoration: none;

  span {
    color: blue;
  }
`;

const RepositoryDescription = styled.p`
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;

const RepositoryStars = styled.p`
  font-size: 14px;
  color: black;
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;

const RepositoryCommits = styled.p`
  font-size: 14px;
  color: black;
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;

export function Repositories(): JSX.Element {
  const { watch } = useFormContext<User>();
  const reposUrl = watch("reposUrl");
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get(reposUrl);
        const data = response.data;

        const mappedRepositories = await Promise.all(
          data.map(async (repo: any) => {
            const commitsResponse = await axios.get(
              repo.commits_url.replace("{/sha}", "")
            );
            const commitsData = commitsResponse.data;
            const commitsCount = commitsData.length;

            return {
              name: repo.name,
              fullName: repo.full_name,
              description: repo.description,
              stargazersCount: repo.stargazers_count,
              commitsCount: commitsCount,
            };
          })
        );

        setRepositories(mappedRepositories);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (reposUrl) {
      fetchRepositories();
    }
  }, [reposUrl]);

  return (
    <RepositoryContainer>
      {repositories.map((repo) => {
        const [owner, repository] = repo.fullName.split("/");

        return (
          <div key={repo.name}>
            <RepositoryName to="#" onClick={() => console.log("Link clicked")}>
              {owner}/<span>{repository}</span>
            </RepositoryName>
            <RepositoryDescription>
              {repo.description ? repo.description : repo.name}
            </RepositoryDescription>
            <RepositoryStars>
              <BsStarFill color="black" size={14} />
              {repo.stargazersCount}
            </RepositoryStars>
            <RepositoryCommits>
              <FaCodeBranch color="black" size={14} />
              {repo.commitsCount}
            </RepositoryCommits>
          </div>
        );
      })}
    </RepositoryContainer>
  );
}
