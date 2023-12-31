import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }

  body {
    margin: 0;
    background-color: #ffffff;
    padding: 0;
  }

  p {
    text-align: center;
  }

  a {
    text-decoration: none;
  }

  .navbar {
    margin: 0;
    padding: 0;
  }
`;
