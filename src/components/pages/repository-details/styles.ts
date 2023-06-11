import styled from "styled-components";

export const LinkBack = styled.p`
  display: flex;
  align-items: center;
  justify-content: end;
  font-size: 20px;
  font-weight: bold;
  margin-right: 200px;
  text-decoration: none;
  color: #3d3d4d;
  transition: color 0.2s;
  outline: none;
  cursor: pointer;

  &:hover {
    color: #666;
  }

  svg {
    margin-right: 4px;
  }

  @media (max-width: 991px) {
    margin-right: 20px;
    justify-content: end;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: none;
  border: none;
`;

export const RepositoryInfo = styled.section`
  margin-top: 80px;
  text-align: left;
  margin-left: 180px;
  font-weight: bold;
  margin-right: 200px;

  @media (max-width: 991px) {
    margin-left: 0;
    justify-content: center;
  }

  header {
    display: flex;
    align-items: center;

    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }

    div {
      margin-left: 24px;

      strong {
        font-size: 36px;
        color: #3d3d4d;
        @media (max-width: 991px) {
          margin-left: 0;
          justify-content: center;
        }
      }

      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
        text-align: left;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }

      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }

      span {
        display: block;
        margin-top: 4px;
        color: #6c6c80;
      }
    }
  }
`;

export const Issues = styled.div`
  margin-top: 80px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;

    display: flex;
    align-items: center;
    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    div {
      margin-left: 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }

    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;

export const SpinnerContainer = styled.div`
  text-align: center;
  justify-content: center;
`;

export const ErrorText = styled.h5`
  text-align: center;
  color: red;
`;
