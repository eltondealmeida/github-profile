import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { BsList } from "react-icons/bs";
import styled from "styled-components";
import githubLogo from "../../assets/img/github.png";
import githubText from "../../assets/img/github-text.png";
import { SearchUser } from "./connected-components/SearchUser";
import { useFormContext } from "react-hook-form";
import { User } from "../../types/User";

export interface PageHeaderProps {
  children: React.ReactNode;
}

export function PageHeader({ children }: PageHeaderProps): JSX.Element {
  const { setValue } = useFormContext<User>();

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

  const MenuButton = styled(Button)`
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    border: 1px solid #fff;
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
            <MenuButton onClick={() => setValue("searchCompleted", false)}>
              <BsList />
            </MenuButton>
          </Nav>
          <SearchUser className="d-none d-lg-flex" />
        </Container>
      </Navbar>
      <SearchUser isOffcanvas />
      <div className="m-3">{children}</div>
    </>
  );
}
