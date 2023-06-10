import { Offcanvas } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useFormContext } from "react-hook-form";
import { User } from "../../../types/User";
import {
  SearchButton,
  SearchForm,
  SearchInput,
  SearchSvgGrayButton,
} from "../../styled/styledComponents";
import axios from "axios";

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
    const login = watch("login");
    const previousLogin = watch("previousLogin");

    if (!login) {
      setValue("searchStatus", "User not found");
      setValue("isLoading", false);
      setValue("searchCompleted", true);
      return;
    }

    try {
      if (login !== previousLogin) {
        setValue("searchStatus", "User not found");
      }

      const response = await axios.get(`https://api.github.com/users/${login}`);

      const data = response.data;

      if (data.message && data.message === "Not Found") {
        setValue("searchStatus", "User not found");
      } else if (data.message && data.message !== "Not Found") {
        setValue("searchStatus", data.message);
      } else {
        setValue("name", data.name);
        setValue("avatarUrl", data.avatar_url);
        setValue("company", data.company);
        setValue("blog", data.blog);
        setValue("location", data.location);
        setValue("bio", data.bio);
        setValue("repository.url", data.repos_url);
        setValue(
          "starred.url",
          data.starred_url.replace("{/owner}{/repo}", "")
        );
        setValue("searchStatus", "");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setValue("isLoading", false);
      setValue("searchCompleted", true);
      setValue("previousLogin", login);
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
          <SearchSvgGrayButton type="submit">
            <BsSearch className="search-icon-black" />
          </SearchSvgGrayButton>
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
