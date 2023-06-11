import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

    svg {
      color: #888;
    }
  }
`;

export const SearchForm = styled(Form)`
  display: flex;
  align-items: center;
`;

export const SearchInput = styled(Form.Control)`
  border: none;
  border-radius: 0;
  border-bottom: 1px solid gray;
  padding: 0;
  width: 100%;
  font-size: 18px;

  &::placeholder {
    font-size: 18px;
  }
}`;

export const ErrorText = styled.h5`
  text-align: center;
  color: red;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 0;
  }
`;

export const FilterButton = styled(Button)`
  border-radius: 20px;
  color: white;
  margin-right: 10px;

  &.last-button {
    margin-right: 0;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const IconContainer = styled.div`
  color: black;
  display: flex;
  align-items: center;
`;

export const RepositoryCommits = styled.p`
  font-size: 14px;
  color: black;
  display: flex;
  align-items: center;
  margin-left: 30px;

  svg {
    margin-right: 5px;
  }
`;

export const RepositoryContainer = styled.div`
  text-align: left;
  margin-top: 30px;
`;

export const RepositoryDescription = styled.p`
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;

export const RepositoryName = styled(Link)`
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-decoration: none;

  span {
    color: blue;
  }
`;

export const RepositoryStars = styled.p`
  font-size: 14px;
  color: black;
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;

export const SearchRepositoryContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const SpinnerContainer = styled.div`
  text-align: center;
  justify-content: center;
`;
