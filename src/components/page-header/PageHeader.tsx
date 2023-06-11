import { Navbar, Nav, Container } from "react-bootstrap";
import { BsList } from "react-icons/bs";
import githubLogo from "../../assets/img/github.png";
import githubText from "../../assets/img/github-text.png";
import { SearchUser } from "./SearchUser";
import { useFormContext } from "react-hook-form";
import { User } from "../../types/User";
import {
  LogoContainer,
  LogoImage,
  LogoText,
  MenuButton,
  ProfileNavLink,
} from "./styles";

export interface PageHeaderProps {
  hideSearchUser?: boolean;
  backgroundColor?: string;
  children: React.ReactNode;
}

export function PageHeader({
  hideSearchUser,
  backgroundColor,
  children,
}: PageHeaderProps): JSX.Element {
  const { setValue } = useFormContext<User>();

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
                <ProfileNavLink href="home">Profile</ProfileNavLink>
              </Nav.Item>
            </Nav>
          </LogoContainer>
          <Nav className="ms-auto d-lg-none text-end">
            <MenuButton onClick={() => setValue("searchCompleted", false)}>
              <BsList />
            </MenuButton>
          </Nav>
          {!hideSearchUser && <SearchUser className="d-none d-lg-flex" />}
        </Container>
      </Navbar>
      {!hideSearchUser && <SearchUser isOffcanvas />}
      <div
        className={!backgroundColor ? "m-3" : `bg-${backgroundColor}`}
        style={{ backgroundColor: backgroundColor }}
      >
        {children}
      </div>
    </>
  );
}
