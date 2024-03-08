import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors, devices, boxStyles, fontStyles } from "@styles/styleVariables";
import paperCup from "@images/papercup.svg";
import logo from "@images/logo.svg";

const NoPage = () => {
  return (
    <Container>
      <ContentWrapper>
        <Header>
          <Link to="/">
            <img src={logo} draggable="false" />
          </Link>
        </Header>
        <Content>
          <h2>404 Not Found</h2>
          <img src={paperCup} draggable="false" />
          <p>
            <span>죄송해요!</span>
            <span>페이지를 찾지 못했어요.</span>
          </p>
        </Content>
      </ContentWrapper>
    </Container>
  );
};

const Header = styled.div`
  & img {
    width: 248px;
    height: 98px;

    @media ${devices.tablet} {
      width: 352px;
      height: 138px;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  min-height: 50vh;
  padding: 40px 24px;
  ${boxStyles.flexColumnCenter};
  justify-content: center;
  gap: 2rem;
  background-color: ${colors.gray10};
  color: ${colors.gray60};
  ${boxStyles.radius16};
  border: 1px solid ${colors.gray30};

  @media ${devices.tablet} {
    max-width: 782px;
    padding: 64px 24px;
  }

  & h2 {
    color: ${colors.brown50};
    ${fontStyles.h3};
    ${fontStyles.bold};
    @media ${devices.tablet} {
      ${fontStyles.h2};
    }
  }

  & p {
    ${boxStyles.flexColumnCenter};
    ${fontStyles.body3};

    @media ${devices.tablet} {
      ${fontStyles.body2};
    }
  }

  & img {
    width: 90%;
  }
`;

const ContentWrapper = styled.div`
  ${boxStyles.flexColumnCenter};
  gap: 3rem;
  width: 100%;
`;

const Container = styled.div`
  padding: 24px 34px;
  background: ${colors.gray20};
  width: 100%;
  height: 100vh;
  ${boxStyles.flexColumnCenter};
  @media ${devices.tablet} {
    padding: 48px;
  }
`;

export default NoPage;
