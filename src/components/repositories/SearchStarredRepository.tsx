import { BsSearch } from "react-icons/bs";
import { useFormContext } from "react-hook-form";
import { User } from "../../types/User";
import { SearchButton, SearchForm, SearchInput } from "./styles";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Repository } from "../../types/Repository";

export function SearchStarredRepository(): JSX.Element {
  const { register, watch, setValue, handleSubmit } = useFormContext<User>();
  const [data, setData] = useState<Repository[]>([]);

  const login = watch("login");
  const name = watch("starred.name");
  const previousName = watch("starred.previousName");
  const starredUrl = watch("starred.url");

  const fetchData = useCallback(async () => {
    setValue("starred.isLoading", true);

    if (!name) {
      const response = await axios.get(
        `https://api.github.com/users/${login}/starred`
      );
      const starredData = response.data;
      const mappedStarredRepositories = await Promise.all(
        starredData?.map(async (repo: any) => {
          const commitsResponse = await axios.get(
            repo.commits_url.replace("{/sha}", "")
          );
          const commitsData = commitsResponse.data;
          const commitsCount = Array.isArray(commitsData)
            ? commitsData?.length
            : 1;

          const mappedRepository: Repository = {
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            stargazersCount: repo.stargazers_count,
            commitsCount: commitsCount,
            type: repo.type,
            language: repo.language,
            previousName: "",
            url: starredUrl,
            count: starredData?.length,
            searchStatus: "",
            isLoading: false,
          };
          return mappedRepository;
        })
      );
      setValue("starred.isLoading", false);
      setValue("starredData", mappedStarredRepositories);
      setData(mappedStarredRepositories);
      setValue("starred.count", starredData?.length);
      return;
    }

    if (name !== previousName) {
      setValue("starred.searchStatus", "Starred repository not found");
    }

    try {
      const response = await axios.get(
        `https://api.github.com/users/${login}/starred`
      );

      const starredData = response.data;

      const surveyData = starredData?.filter(
        (repo: { name: string }) => repo.name === name
      );

      const mappedSurveyRepositories = await Promise.all(
        surveyData?.map(async (repo: any) => {
          const commitsResponse = await axios.get(
            repo.commits_url.replace("{/sha}", "")
          );
          const commitsData = commitsResponse.data;
          const commitsCount = Array.isArray(commitsData)
            ? commitsData?.length
            : 1;

          const mappedRepository: Repository = {
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description,
            stargazersCount: repo.stargazers_count,
            commitsCount: commitsCount,
            type: repo.type,
            language: repo.language,
            previousName: "",
            url: starredUrl,
            count: surveyData?.length,
            searchStatus: "",
            isLoading: false,
          };
          return mappedRepository;
        })
      );

      if (surveyData) {
        setValue("starredData", mappedSurveyRepositories);
        setValue("starred.count", surveyData?.length);
        setValue("starred.searchStatus", "");
      } else {
        setValue("starred.searchStatus", "Starred repository not found");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setValue("starred.isLoading", false);
      setValue("starred.previousName", name);
    }
  }, [name, previousName, login, starredUrl, setValue]);

  useEffect(() => {
    const handleInputChange = () => {
      const inputElement = document.getElementById(
        "starred.name"
      ) as HTMLInputElement;
      if (inputElement && inputElement.value === "") {
        setValue("starred.isLoading", false);
        setValue("starredData", data);
        setValue("starred.count", data.length);
        setValue("starred.searchStatus", "");
        setValue("starred.previousName", "");
      }
    };

    const inputElement = document.getElementById("starred.name");
    if (inputElement) {
      inputElement.addEventListener("input", handleInputChange);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("input", handleInputChange);
      }
    };
  }, [setValue, data]);

  return (
    <SearchForm onSubmit={handleSubmit(fetchData)}>
      <SearchButton type="submit">
        <BsSearch />
      </SearchButton>
      <SearchInput
        type="search"
        placeholder="Search repository"
        {...register("starred.name")}
        id="starred.name"
      />
    </SearchForm>
  );
}
