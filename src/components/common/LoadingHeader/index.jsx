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
  width: 75px;
  height: 20px;
`;

export default LoadingHeader;
