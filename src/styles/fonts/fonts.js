import { createGlobalStyle } from "styled-components";

const GlobalFont = createGlobalStyle`
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard"), url("./Pretendard-Regular.woff2"}) format("woff2");
    font-weight: 400;
  }
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard"), url"./Pretendard-Medium.woff2") format("woff2");
    font-weight: 500;
  }
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard"), url("./Pretendard-Bold.woff2") format("woff2");
    font-weight: 700;
  }
`;

export default GlobalFont;
