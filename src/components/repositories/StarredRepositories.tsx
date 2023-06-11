import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { BsStarFill, BsChevronDown } from "react-icons/bs";
import { FaCodeBranch } from "react-icons/fa";
import { Form, Offcanvas, Spinner } from "react-bootstrap";

import {
  ButtonGroup,
  ErrorText,
  FilterButton,
  FilterContainer,
  IconContainer,
  RepositoryCommits,
  RepositoryContainer,
  RepositoryDescription,
  RepositoryName,
  RepositoryStars,
  SearchRepositoryContainer,
  SpinnerContainer,
} from "./styles";
import { useMediaQuery } from "react-responsive";
import { SearchStarredRepository } from "./SearchStarredRepository";
import { User } from "../../types/User";
import { Repository } from "../../types/Repository";
import axios from "axios";

export function StarredRepositories(): JSX.Element {
  const { watch, setValue } = useFormContext<User>();
  const [showTypeFilter, setShowTypeFilter] = useState(false);
  const [showLanguageFilter, setShowLanguageFilter] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string[]>(["All"]);
  const [languageFilter, setLanguageFilter] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  const isDesktop = useMediaQuery({ minWidth: 992 });

  const starredUrl = watch("starred.url");
  const searchStatus = watch("starred.searchStatus");
  const isLoading = watch("starred.isLoading");
  const starredData = watch("starredData");

  useEffect(() => {
    const fetchStarredRepositories = async () => {
      try {
        const response = await axios.get(starredUrl);
        const data = response.data;

        if (data.message && data.message === "Not Found") {
          setValue(
            "starred.searchStatus",
            "This user has no starred repositories"
          );
        } else if (data.message && data.message !== "Not Found") {
          setValue("starred.searchStatus", data.message);
        } else {
          const mappedStarredRepositories = await Promise.all(
            data?.map(async (repo: any) => {
              const commitsResponse = await axios.get(
                repo.commits_url.replace("{/sha}", "")
              );
              const commitsData = commitsResponse.data;
              const commitsCount = Array.isArray(commitsData)
                ? commitsData?.length
                : 1;

              const mappedStarredRepository: Repository = {
                name: repo.name,
                fullName: repo.full_name,
                description: repo.description,
                stargazersCount: repo.stargazers_count,
                commitsCount: commitsCount,
                type: repo.type,
                language: repo.language,
                previousName: "",
                url: starredUrl,
                count: 0,
                searchStatus: "",
                isLoading: false,
              };
              return mappedStarredRepository;
            })
          );
          setValue("starredData", mappedStarredRepositories);
          setValue("starred.count", data?.length);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (starredUrl) {
      fetchStarredRepositories();
    }
  }, [starredUrl, setValue]);

  useEffect(() => {
    const repoLanguages = starredData?.reduce<string[]>((langs, repo) => {
      if (repo.language && !langs.includes(repo.language)) {
        return [...langs, repo.language];
      }
      return langs;
    }, []);

    setLanguages(repoLanguages);
  }, [starredData]);

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

  const filterStarredRepositories = (repo: Repository) => {
    if (!typeFilter.includes("All") && !typeFilter.includes(repo.type)) {
      return false;
    }

    if (languageFilter?.length > 0 && !languageFilter.includes(repo.language)) {
      return false;
    }

    return true;
  };

  const filteredStarredRepositories = starredData?.filter(
    filterStarredRepositories
  );

  return (
    <RepositoryContainer>
      <FilterContainer>
        {isDesktop && (
          <SearchRepositoryContainer>
            <SearchStarredRepository />
          </SearchRepositoryContainer>
        )}
        <ButtonGroup>
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
        </ButtonGroup>
        {!isDesktop && (
          <SearchRepositoryContainer>
            <SearchStarredRepository />
          </SearchRepositoryContainer>
        )}
      </FilterContainer>

      {isLoading ? (
        <SpinnerContainer>
          <Spinner animation="border" />
        </SpinnerContainer>
      ) : searchStatus ? (
        <ErrorText>{searchStatus}</ErrorText>
      ) : (
        filteredStarredRepositories?.map((repo) => {
          const [owner, repository] = repo.fullName.split("/");
          return (
            <div key={repo.name}>
              <RepositoryName
                to="#"
                onClick={() => console.log("Link clicked")}
              >
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
        })
      )}
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
              checked={languageFilter?.length === languages?.length}
              onChange={handleLanguageFilterChange}
            />
            {languages?.map((language) => (
              <Form.Check
                key={language}
                type="checkbox"
                id={`language-${language}`}
                label={language}
                value={language}
                checked={languageFilter.includes(language)}
                onChange={handleLanguageFilterChange}
              />
            ))}
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </RepositoryContainer>
  );
}
