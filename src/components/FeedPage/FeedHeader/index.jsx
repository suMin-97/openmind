import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HeaderImg from "@images/header-image.png";
import logoImg from "@images/logo.svg";
import useRequest from "@hooks/useRequest";
import ProfileImage from "@components/common/ProfileImage";
import { colors, devices, fontStyles } from "@styles/styleVariables";

const FeedHeader = ({ id }) => {
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
          <ImageContainer />
          <HeaderContent>
            <Link to={"/"}>
              <Logo src={logoImg} />
            </Link>
            <ProfileImage src={ProfileData?.imageSource} size="xLarge" />
            <Name>
              {ProfileData?.name ?? (
                <span>정보를 불러오는데 실패했습니다.</span>
              )}
            </Name>
          </HeaderContent>
        </Container>
      </Header>
    </>
  );
};

export default FeedHeader;

const ImageContainer = styled.div`
  width: 100%;
  height: 177px;
  background-color: ${colors.gray10};
  background-image: url(${HeaderImg});
  background-position: top center;
  background-size: 906px 177px;
  background-repeat: no-repeat;

  @media ${devices.tablet} {
    background-size: 1200px 234px;
    height: 234px;
  }
`;

const HeaderContent = styled.div``;

const Header = styled.div`
  display: block;
  justify-content: center;
  width: 100%;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: auto;
  padding-bottom: 82px;

  @media ${devices.tablet} {
    padding-bottom: 95px;
  }

  & ${HeaderContent} {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);

    @media ${devices.tablet} {
      top: 50px;
    }
  }
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
  ${fontStyles.h3};
  ${fontStyles.regular};

  @media ${devices.tablet} {
    ${fontStyles.h2};
  }
`;
