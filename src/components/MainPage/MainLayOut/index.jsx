import styled from "styled-components";
import { colors, boxStyles, fontStyles, devices } from "@styles/styleVariables";
import backgroundImg from "@images/background-image.png";
import Toast from "../../common/Toast";

const MainLayout = ({ children, isOpenToast }) => {
  return (
    <ContainDiv>
      <Container>
        <ContainHeader>{children}</ContainHeader>
      </Container>
      {isOpenToast && <Toast>특수문자를 제외한 2-8 글자 내 작성해주세요</Toast>}
    </ContainDiv>
  );
};

const ContainDiv = styled.div`
  background: ${colors.gray20};
  width: 100%;
  height: 100vh;
  ${boxStyles.flexColumnCenter};
`;

const Container = styled.div`
  background-image: url(${backgroundImg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
  width: 100%;
  height: 100vh;

  ${boxStyles.flexColumnCenter};
  justify-content: center;
  @media ${devices.desktop} {
    max-width: 1200px;
  }
`;

const ContainHeader = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 940px;
  position: relative;
  ${boxStyles.flexColumnCenter};
  justify-content: center;
`;

export default MainLayout;
