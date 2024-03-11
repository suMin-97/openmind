import styled from "styled-components";
import { colors, boxStyles, devices } from "@styles/styleVariables";
import logo from "@images/logo.svg";
import ArrowButton from "@components/common/ArrowButton";

const MainPageHeader = ({ navigateQuestionPage }) => {
  return (
    <Header>
      <img className="main-logo" src={logo} draggable="false" />
      <ArrowButton onClick={navigateQuestionPage}>질문하러 가기</ArrowButton>
    </Header>
  );
};

const Header = styled.div`
  ${boxStyles.flexColumnCenter}
  margin-bottom: 24px;
  gap: 24px;
  background: ${colors.gray20};

  .main-logo {
    width: 248px;
    height: 98px;
    flex-shrink: 0;
  }

  @media ${devices.tablet} {
    .main-logo {
      width: 456px;
      height: 180px;
      flex-shrink: 0;
    }

    button {
      position: absolute;
      top: 49.5px;
      right: 50px;
    }
  }
  @media ${devices.desktop} {
    button {
      position: absolute;
      top: 49.5px;
      right: 0px;
    }
  }
`;

export default MainPageHeader;
