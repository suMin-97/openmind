import styled from "styled-components";
import { boxStyles, colors, devices } from "@styles/styleVariables";

const BasicLoadingFeedCard = ({ className }) => {
  return (
    <div className={className}>
      <LoadingBadgeBox className="skeleton" />
      <TextBox>
        <LoadingBox className="skeleton" />
      </TextBox>
      <ContentDiv>
        <LoadingImageBox className="skeleton" />
        <ContentRightBox>
          <LoadingBox className="skeleton" />
          <TextBox>
            <LoadingBox className="skeleton" />
            <LoadingBox className="skeleton" />
          </TextBox>
        </ContentRightBox>
      </ContentDiv>
    </div>
  );
};

const LoadingBox = styled.div`
  background-color: ${colors.loading};
  width: 75px;
  height: 18px;

  &.skeleton {
    ${boxStyles.skeletonAnimation};
  }
`;

const LoadingImageBox = styled(LoadingBox)`
  width: 32px;
  height: 32px;
  ${boxStyles.radiusC};

  @media ${devices.tablet} {
    width: 48px;
    height: 48px;
  }
`;

const LoadingBadgeBox = styled(LoadingBox)`
  width: 77px;
  height: 28px;
  ${boxStyles.radius8};
`;

const ContentDiv = styled.div`
  display: flex;
  gap: 12px;
`;

const ContentRightBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & ${LoadingBox}:first-child {
    width: 100%;
  }

  & ${LoadingBox}:last-child {
    width: 60%;
  }
`;

const LoadingFeedCard = styled(BasicLoadingFeedCard)`
  width: 100%;
  ${boxStyles.padding24};
  ${boxStyles.shadow1};
  background-color: ${colors.gray10};
  ${boxStyles.radius16};
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default LoadingFeedCard;
