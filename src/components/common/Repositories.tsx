import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import axios from "axios";
import { Repository } from "../../types/Repository";
import styled from "styled-components";
import { BsStarFill, BsChevronDown } from "react-icons/bs";
import { FaCodeBranch } from "react-icons/fa";
import { Button, Form, Offcanvas } from "react-bootstrap";
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

const IconContainer = styled.div`
  color: black;
  display: flex;
  align-items: center;
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
  margin-left: 30px;

  svg {
    margin-right: 5px;
  }
`;

const FilterButton = styled(Button)`
  border-radius: 20px;
  color: white;
  margin-right: 10px;

  &.last-button {
    margin-right: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

export function Repositories(): JSX.Element {
  const { watch } = useFormContext<User>();
  const reposUrl = watch("reposUrl");
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showLanguageFilter, setShowLanguageFilter] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string[]>(["All"]);
  const [languageFilter, setLanguageFilter] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

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
              type: repo.type,
              language: repo.language,
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

  useEffect(() => {
    const repoLanguages = repositories.reduce<string[]>((langs, repo) => {
      if (repo.language && !langs.includes(repo.language)) {
        return [...langs, repo.language];
      }
      return langs;
    }, []);

    setLanguages(repoLanguages);
  }, [repositories]);

  const handleTypeFilterClick = () => {
    setShowTypeFilter(!showTypeFilter);
  };

  const handleLanguageFilterClick = () => {
    setShowLanguageFilter(!showLanguageFilter);
  };

  const handleTypeFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    if (checked) {
      setTypeFilter((prevFilters) => [...prevFilters, value]);
    } else {
      setTypeFilter((prevFilters) =>
        prevFilters.filter((filter) => filter !== value)
      );
    }
  };

  const handleLanguageFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    if (value === "All" && checked) {
      setLanguageFilter(languages);
    } else if (checked) {
      setLanguageFilter((prevFilters) => [...prevFilters, value]);
    } else {
      setLanguageFilter((prevFilters) =>
        prevFilters.filter((filter) => filter !== value)
      );
    }
  };

  const filterRepositories = (repo: Repository) => {
    if (!typeFilter.includes("All") && !typeFilter.includes(repo.type)) {
      return false;
    }

    if (languageFilter.length > 0 && !languageFilter.includes(repo.language)) {
      return false;
    }

    return true;
  };

  const filteredRepositories = repositories.filter(filterRepositories);

  return (
    <RepositoryContainer>
      <ButtonContainer>
        <FilterButton variant="primary" onClick={handleTypeFilterClick}>
          <BsChevronDown className="me-2" />
          Type
        </FilterButton>
        <FilterButton
          className="last-button"
          variant="primary"
          onClick={handleLanguageFilterClick}
        >
          <BsChevronDown className="me-2" />
          Language
        </FilterButton>
      </ButtonContainer>
      {filteredRepositories.map((repo) => {
        const [owner, repository] = repo.fullName.split("/");
        return (
          <div key={repo.name}>
            <RepositoryName to="#" onClick={() => console.log("Link clicked")}>
              {owner} / <span>{repository}</span>
            </RepositoryName>
            <RepositoryDescription>{repo.description}</RepositoryDescription>
            <IconContainer>
              <RepositoryStars>
                <BsStarFill /> {repo.stargazersCount}
              </RepositoryStars>
              <RepositoryCommits>
                <FaCodeBranch /> {repo.commitsCount}
              </RepositoryCommits>
            </IconContainer>
          </div>
        );
      })}
      <Offcanvas
        show={showTypeFilter}
        onHide={handleTypeFilterClick}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter by Type</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Check
              type="checkbox"
              id="type-all"
              label="All"
              value="All"
              checked={typeFilter.includes("All")}
              onChange={handleTypeFilterChange}
            />
            <Form.Check
              type="checkbox"
              id="type-repository"
              label="Repository"
              value="Repository"
              checked={typeFilter.includes("Repository")}
              onChange={handleTypeFilterChange}
            />
            <Form.Check
              type="checkbox"
              id="type-fork"
              label="Fork"
              value="Fork"
              checked={typeFilter.includes("Fork")}
              onChange={handleTypeFilterChange}
            />
            <Form.Check
              type="checkbox"
              id="type-source"
              label="Source"
              value="Source"
              checked={typeFilter.includes("Source")}
              onChange={handleTypeFilterChange}
            />
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas
        show={showLanguageFilter}
        onHide={handleLanguageFilterClick}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter by Language</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Check
              type="checkbox"
              id="language-all"
              label="All"
              value="All"
              checked={languageFilter.length === 0}
              onChange={handleLanguageFilterChange}
            />
            {languages.map((lang) => (
              <Form.Check
                key={lang}
                type="checkbox"
                id={`language-${lang}`}
                label={lang}
                value={lang}
                checked={languageFilter.includes(lang)}
                onChange={handleLanguageFilterChange}
              />
            ))}
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </RepositoryContainer>
  );
}
