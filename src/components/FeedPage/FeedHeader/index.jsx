import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors, devices, fontStyles } from "@styles/styleVariables";
import HeaderImg from "@images/header-image.png";
import logoImg from "@images/logo.svg";
import ProfileImage from "@components/common/ProfileImage";
import LoadingHeader from "@components/common/LoadingHeader";

const FeedHeader = ({ subjectData, error, isLoading }) => {
  const { imageSource, name } = subjectData ?? {};

  return (
    <>
      <Header>
        <Container>
          <ImageContainer />
          <HeaderContent>
            <Link to={"/"}>
              <Logo src={logoImg} draggable="false" />
            </Link>
            {isLoading ? (
              <LoadingHeader />
            ) : (
              <>
                <ProfileImage src={imageSource} size="xLarge" />
                <Name>
                  {error ? <span>정보를 불러오는데 실패했습니다.</span> : name}
                </Name>
              </>
            )}
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
