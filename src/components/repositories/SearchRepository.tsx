import { BsSearch } from "react-icons/bs";
import { useFormContext } from "react-hook-form";

import { SearchButton, SearchForm, SearchInput } from "./styles";
import { useEffect } from "react";
import { User } from "../../types/User";
import axios from "axios";

export function SearchRepository(): JSX.Element {
  const { register, watch, setValue, handleSubmit } = useFormContext<User>();

  const login = watch("login");
  const name = watch("repository.name");
  const previousName = watch("repository.previousName");

  const onSearchSubmit = async () => {
    setValue("repository.isLoading", true);

    if (!name) {
      setValue("repository.isLoading", false);
      setValue("repository.url", `https://api.github.com/users/${login}/repos`);
      return;
    }

    try {
      if (name !== previousName) {
        setValue("repository.searchStatus", "Repository not found");
      }

      const response = await axios.get(
        `https://api.github.com/repos/${login}/${name}`
      );

      const data = response.data;

      if (data.message && data.message === "Not Found") {
        setValue("repository.searchStatus", "Repository not found");
      } else {
        setValue(
          "repository.url",
          `https://api.github.com/repos/${login}/${name}`
        );
        setValue("repository.searchStatus", "");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setValue("repository.isLoading", false);
      setValue("repository.previousName", name);
    }
  };

  useEffect(() => {
    const handleInputChange = () => {
      const inputElement = document.getElementById("name") as HTMLInputElement;
      if (inputElement && inputElement.value === "") {
        setValue("repository.isLoading", false);
        setValue(
          "repository.url",
          `https://api.github.com/users/${login}/repos`
        );
      }
    };

    const inputElement = document.getElementById("repository.name");
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
      <SearchButton type="submit">
        <BsSearch />
      </SearchButton>
      <SearchInput
        type="search"
        placeholder="Search repository"
        {...register("repository.name")}
        id="repository.name"
      />
    </SearchForm>
  );
}
