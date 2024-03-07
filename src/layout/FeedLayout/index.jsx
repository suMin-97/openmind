import styled from "styled-components";
import { colors, devices, boxStyles } from "@styles/styleVariables";
import FeedHeader from "@components/FeedPage/FeedHeader";
import ShareButtons from "@components/common/ShareButtons";

const FeedBasicLayout = ({ children, id, className, $feedType }) => {
  return (
    <Container className={className} $feedType={$feedType}>
      <FeedHeader id={id} />
      <ShareButtons id={id} />
      <ContainerWrap>{children}</ContainerWrap>
    </Container>
  );
};

const Container = styled.div`
  ${boxStyles.flexColumnCenter};
  background-color: ${colors.gray20};
  min-height: 100vh;
  gap: 12px;
`;

const ContainerWrap = styled.div`
  ${boxStyles.flexColumnCenter};
  gap: 12px;
  width: 100%;
  margin-bottom: 168px;
  padding: 0 24px;

  @media ${devices.tablet} {
    max-width: 782px;
    margin-bottom: 140px;
    padding: 0 32px;
  }
`;

const FeedLayout = styled(FeedBasicLayout)`
  & ${ContainerWrap} {
    margin-top: ${({ $feedType }) =>
      $feedType === "question" ? "42px" : "0px"};
  }
`;

export default FeedLayout;
