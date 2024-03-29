import styled from "styled-components";
import { boxStyles, colors, devices } from "@styles/styleVariables";

const LoadingHeader = () => {
  return (
    <>
      <LoadingProfileImg />
      <NameBox>
        <LoadingProfileName />
      </NameBox>
    </>
  );
};

const LoadingProfileImg = styled.div`
  width: 104px;
  height: 104px;
  ${boxStyles.radiusC};
  ${boxStyles.padding24};
  ${boxStyles.shadow1};
  ${boxStyles.skeletonAnimation}
  background-color: ${colors.loading};

  @media ${devices.tablet} {
    width: 136px;
    height: 136px;
  }
`;

const NameBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const LoadingProfileName = styled.div`
  background-color: ${colors.loading};
  ${boxStyles.radius16};
  ${boxStyles.skeletonAnimation}
  width: 75px;
  height: 20px;
  ${boxStyles.shadow1};
`;

export default LoadingHeader;
