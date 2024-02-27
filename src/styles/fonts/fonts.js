import { createGlobalStyle } from "styled-components";
import PretendardBold from "./Pretendard-Bold.woff2";
import PretendardMedium from "./Pretendard-Medium.woff2";
import PretendardRegular from "./Pretendard-Regular.woff2";

const GlobalFont = createGlobalStyle`
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard"), url(${PretendardRegular}) format("woff2");
    font-weight: regular;
  }
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard"), url(${PretendardMedium}) format("woff2");
    font-weight: medium;
  }
  @font-face {
    font-family: "Pretendard";
    src: local("Pretendard"), url(${PretendardBold}) format("woff2");
    font-weight: bold;
  }
`;

export default GlobalFont;
