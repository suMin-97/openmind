import styled from "styled-components";
import { boxStyles, colors } from "@styles/styleVariables";

const LoadingModalForm = () => {
  return (
    <LoadingModalProfile>
      <ImgBox />
      <TextBox />
    </LoadingModalProfile>
  );
};

export default LoadingModalForm;

const LoadingModalProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ImgBox = styled.div`
  ${boxStyles.radiusC};
  ${boxStyles.skeletonAnimation}
  background-color: ${colors.loading};
  width: 28px;
  height: 28px;
`;

const TextBox = styled.div`
  background-color: ${colors.loading};
  ${boxStyles.skeletonAnimation}
  width: 90px;
  height: 22px;
`;
