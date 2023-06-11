import { Badge } from "react-bootstrap";
import styled from "styled-components";

export const ErrorText = styled.h5`
  text-align: center;
  color: red;
`;

export const IntroText = styled.h5`
  text-align: center;
`;

export const SpinnerContainer = styled.div`
  text-align: center;
  justify-content: center;
`;

export const StyledBadge = styled(Badge)`
  &&& {
    margin-left: 5px;
    background-color: lightgray;
    color: black;
    border-radius: 10px;
    padding: 5px 8px;
    ${(props) => props.bg && `background-color: ${props.bg};`}
    border: 1px solid #bbbbbb;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const TabIcon = styled.div`
  margin-right: 8px;
`;

export const Tab = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  padding: 8px 16px;
  border-bottom: 2px solid transparent;
  display: flex;
  align-items: center;
  color: ${(props) => (props.isActive ? "black" : "gray")};
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  ${(props) =>
    props.isActive &&
    `
      border-bottom-color: #fd8c73;
    `}

  @media (max-width: 992px) {
    flex: 1;
  }
`;
