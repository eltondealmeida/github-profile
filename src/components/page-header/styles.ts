import { Button, Form, Nav } from "react-bootstrap";
import styled from "styled-components";

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 180px;

  @media (max-width: 991px) {
    margin-left: 0;
    justify-content: center;
  }
`;

export const LogoImage = styled.img`
  width: 24px;
  height: 23px;
  margin-right: 8px;
`;

export const LogoText = styled.img`
  width: 90px;
  height: 40px;
`;

export const ProfileNavLink = styled(Nav.Link)`
  color: #fff;
`;

export const MenuButton = styled(Button)`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  border: 1px solid #fff;
`;

export const SearchButton = styled(Button)`
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

export const SearchForm = styled(Form)`
  display: flex;
  align-items: center;
`;

export const SearchInput = styled(Form.Control)`
  border-radius: 4px;
  width: 150px;
  font-size: 12px;

  &::placeholder {
    font-size: 12px;
  }
`;

export const SearchOffcanvasButton = styled(Button)`
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
