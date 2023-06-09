import { BsSearch } from "react-icons/bs";
import { useFormContext } from "react-hook-form";
import { User } from "../../../types/User";
import {
  SearchSvgGrayButton,
  SearchForm,
  SearchRepositoryInput,
} from "../../styled/styledComponents";
import { useEffect } from "react";
import axios from "axios";

export function SearchRepository(): JSX.Element {
  const { register, watch, setValue, handleSubmit } = useFormContext<User>();

  const login = watch("login");
  const repositoryName = watch("repositoryName");
  const previousRepositoryName = watch("previousRepositoryName");

  const onSearchSubmit = async () => {
    setValue("isRepositoryLoading", true);

    if (!repositoryName) {
      setValue("isRepositoryLoading", false);
      setValue("reposUrl", `https://api.github.com/users/${login}/repos`);
      return;
    }

    try {
      if (repositoryName !== previousRepositoryName) {
        setValue("searchRepositoryStatus", "Repository not found");
      }

      const response = await axios.get(
        `https://api.github.com/repos/${login}/${repositoryName}`
      );

      const data = response.data;

      if (data.message && data.message === "Not Found") {
        setValue("searchRepositoryStatus", "Repository not found");
      } else {
        setValue(
          "reposUrl",
          `https://api.github.com/repos/${login}/${repositoryName}`
        );
        setValue("searchRepositoryStatus", "");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setValue("isRepositoryLoading", false);
      setValue("previousRepositoryName", repositoryName);
    }
  };

  useEffect(() => {
    const handleInputChange = () => {
      const inputElement = document.getElementById(
        "repositoryName"
      ) as HTMLInputElement;
      if (inputElement && inputElement.value === "") {
        setValue("isRepositoryLoading", false);
        setValue("reposUrl", `https://api.github.com/users/${login}/repos`);
      }
    };

    const inputElement = document.getElementById("repositoryName");
    if (inputElement) {
      inputElement.addEventListener("input", handleInputChange);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("input", handleInputChange);
      }
    };
  }, [login, setValue]);

  return (
    <SearchForm onSubmit={handleSubmit(onSearchSubmit)}>
      <SearchSvgGrayButton type="submit">
        <BsSearch />
      </SearchSvgGrayButton>
      <SearchRepositoryInput
        type="search"
        placeholder="Search repository"
        {...register("repositoryName")}
        id="repositoryName"
      />
    </SearchForm>
  );
}
