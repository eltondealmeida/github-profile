import {
  Navbar,
  Nav,
  Container,
  Form,
  InputGroup,
  Button,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import githubLogo from "../../assets/img/github.png";
import githubText from "../../assets/img/github-text.png";
import { useFormContext } from "react-hook-form";
import { User } from "../../types/User";

export interface PageHeaderProps {
  children: React.ReactNode;
}

export function PageHeader({ children }: PageHeaderProps): JSX.Element {
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
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-0">
        <Container className="m-2">
          <Navbar.Brand href="home" style={{ marginLeft: "20%" }}>
            <img alt="Github logo" src={githubLogo} width="24" height="23" />
            <img
              alt="Github text"
              src={githubText}
              width="85"
              height="40"
              className="ms-2"
            />
          </Navbar.Brand>
          <Navbar.Brand href="home" className="fw-bold">
            /
          </Navbar.Brand>
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
            <Nav.Link href="home">Profile</Nav.Link>
          </Nav>

          <Form onSubmit={handleSubmit(onSearchSubmit)}>
            <InputGroup size="sm">
              <Form.Control
                type="search"
                placeholder="Search username"
                aria-label="Search"
                {...register("login")}
              />
              <Button variant="outline-secondary" type="submit">
                <BsSearch />
              </Button>
            </InputGroup>
          </Form>
        </Container>
      </Navbar>
      <div className="m-3">{children}</div>
    </>
  );
}
