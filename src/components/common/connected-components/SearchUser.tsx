import { Offcanvas } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useFormContext } from "react-hook-form";
import { User } from "../../../types/User";
import {
  SearchButton,
  SearchForm,
  SearchInput,
  SearchOffcanvasButton,
} from "../../styled/styledComponents";

export interface SearchUserProps {
  isOffcanvas?: boolean;
  className?: string;
}

export function SearchUser({
  isOffcanvas,
  className,
}: SearchUserProps): JSX.Element {
  const { register, watch, setValue, handleSubmit } = useFormContext<User>();

  const onSearchSubmit = async () => {
    setValue("isLoading", true);
    try {
      const response = await fetch(
        `https://api.github.com/users/${watch("login")}`
      );

      const data = await response.json();

      if (data.message && data.message === "Not Found") {
        setValue("statusSearch", "User not found");
      } else {
        setValue("avatarUrl", data.avatar_url);
        setValue("starredUrl", data.starred_url);
        setValue("reposUrl", data.repos_url);
        setValue("name", data.name);
        setValue("company", data.company);
        setValue("blog", data.blog);
        setValue("location", data.location);
        setValue("email", data.email);
        setValue("bio", data.bio);
        setValue("publicRepos", data.public_repos);
        setValue("statusSearch", "");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setValue("isLoading", false);
      setValue("searchCompleted", true);
    }
  };

  return isOffcanvas ? (
    <Offcanvas
      show={watch("searchCompleted") === false}
      onHide={() => setValue("searchCompleted", true)}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <SearchForm onSubmit={handleSubmit(onSearchSubmit)}>
          <SearchInput
            type="search"
            placeholder="Search username"
            {...register("login")}
          />
          <SearchOffcanvasButton type="submit">
            <BsSearch className="search-icon-black" />
          </SearchOffcanvasButton>
        </SearchForm>
      </Offcanvas.Body>
    </Offcanvas>
  ) : (
    <SearchForm onSubmit={handleSubmit(onSearchSubmit)} className={className}>
      <SearchInput
        type="search"
        placeholder="Search username"
        {...register("login")}
      />
      <SearchButton type="submit">
        <BsSearch />
      </SearchButton>
    </SearchForm>
  );
}
