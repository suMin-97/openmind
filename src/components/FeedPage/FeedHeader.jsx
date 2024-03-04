import { Link } from "react-router-dom";
import styled from "styled-components";
import logoImg from "../../assets/images/logo.svg";
import FeedPageProfile from "../common/FeedPageProfile";
import HeaderImg from "../../assets/images/header-image.png";

const FeedHeader = () => {
  return (
    <>
      <Header>
        <Container>
          <Link to={"/"}>
            <Logo src={logoImg} />
          </Link>
          <FeedPageProfile />
        </Container>
      </Header>
    </>
  );
};

export default FeedHeader;

const Header = styled.div`
  display: block;
  justify-content: center;
  background-image: url(${HeaderImg});
  background-position: top center;
  background-size: auto;
  background-repeat: no-repeat;

  @media (max-width: 1199px) {
    background-size: 1200px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: auto;
  padding-top: 50px;
  margin-bottom: 10px;
`;

const Logo = styled.img`
  width: 170px;
  height: 67px;

  @media (max-width: 767px) {
    width: 124px;
    height: 49px;
  }
`;

const Name = styled.p`
  @media (max-width: 767px) {
    font-size: 2.4rem;
    line-height: 3rem;
  }
`;
