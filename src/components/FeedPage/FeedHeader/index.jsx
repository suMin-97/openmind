import { Link } from "react-router-dom";
import styled from "styled-components";
import HeaderImg from "../../../assets/images/header-image.png";
import logoImg from "../../../assets/images/logo.svg";
import { useParams } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import { useEffect } from "react";
import ProfileImage from "../../common/ProfileImg";

const FeedHeader = () => {
  const { id } = useParams();

  const {
    data: ProfileData,
    error,
    isLoading,
    request,
  } = useRequest({
    method: "GET",
    url: `subjects/${id}`,
  });

  useEffect(() => {
    request();
  }, []);

  return (
    <>
      <Header>
        <Container>
          <Link to={"/"}>
            <Logo src={logoImg} />
          </Link>
          <ProfileImage src={ProfileData?.imageSource} size="xxLarge" />
          <Name>
            {ProfileData?.name ?? <span>정보를 불러오는데 실패했습니다.</span>}
          </Name>
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
