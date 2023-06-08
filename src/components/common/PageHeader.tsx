import { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  Button,
  Offcanvas,
} from "react-bootstrap";
import { BsSearch, BsList } from "react-icons/bs";
import styled from "styled-components";
import githubLogo from "../../assets/img/github.png";
import githubText from "../../assets/img/github-text.png";
import { useFormContext } from "react-hook-form";
import { User } from "../../types/User";

export interface PageHeaderProps {
  children: React.ReactNode;
}

export function PageHeader({ children }: PageHeaderProps): JSX.Element {
  const { register, watch, setValue, handleSubmit } = useFormContext<User>();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

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
      if (showOffcanvas) {
        setShowOffcanvas(false);
      }
    }
  };

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSubmit(onSearchSubmit)();
    }
  }

  const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: 60px;
  `;

  const LogoImage = styled.img`
    width: 24px;
    height: 23px;
    margin-right: 8px;
  `;

  const LogoText = styled.img`
    width: 90px;
    height: 40px;
  `;

  const ProfileLink = styled(Nav.Link)`
    color: #fff;
  `;

  const SearchForm = styled(Form)`
    display: flex;
    align-items: center;
  `;

  const SearchInput = styled(Form.Control)`
    border-radius: 4px;
    width: 150px;
    font-size: 12px;

    &::placeholder {
      font-size: 12px;
    }
  `;

  const SearchButton = styled(Button)`
    &&& {
      background-color: transparent;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;

      &:focus,
      &:active {
        background-color: transparent;
      }

      &:active {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  `;

  const SearchOffcanvasButton = styled(Button)`
    &&& {
      background-color: transparent;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;

      &:focus,
      &:active {
        background-color: transparent;
      }

      &:active {
        background-color: rgba(0, 0, 0, 0.1);
      }

      svg {
        color: #888;
      }
    }
  `;

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-0">
        <Container className="m-2">
          <LogoContainer>
            <LogoImage alt="Github logo" src={githubLogo} />
            <LogoText alt="Github text" src={githubText} />
            <Nav>
              <Nav.Item>
                <Nav.Link href="/" className="fw-bold">
                  /
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <ProfileLink href="home">Profile</ProfileLink>
              </Nav.Item>
            </Nav>
          </LogoContainer>
          <Nav className="ms-auto d-lg-none text-end">
            <Button
              variant="outline-secondary"
              onClick={() => setShowOffcanvas(!showOffcanvas)}
            >
              <BsList />
            </Button>
          </Nav>
          <SearchForm
            onSubmit={handleSubmit(onSearchSubmit)}
            className="d-none d-lg-flex"
          >
            <SearchInput
              type="search"
              placeholder="Search username"
              {...register("login")}
              onKeyPress={handleKeyPress}
            />
            <SearchButton type="submit">
              <BsSearch />
            </SearchButton>
          </SearchForm>
        </Container>
      </Navbar>
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
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
              onKeyPress={handleKeyPress}
            />
            <SearchOffcanvasButton type="submit">
              <BsSearch className="search-icon-black" />
            </SearchOffcanvasButton>
          </SearchForm>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="m-3">{children}</div>
    </>
  );
}
