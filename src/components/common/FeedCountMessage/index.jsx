import styled from "styled-components";
import { fontStyles, boxStyles, colors, devices } from "@styles/styleVariables";
import { ReactComponent as MessagesIcon } from "@icons/Messages.svg";

const BasicFeedCountMessage = ({ className, count, isLoading, error }) => {
  const countMessage = () => {
    if (isLoading) {
      return <span>질문을 읽어오는 중입니다.</span>;
    }
    if (error) {
      return <span>질문을 읽어오는데 실패했습니다.</span>;
    }
    return (
      <span>
        {count !== 0
          ? `${count}개의 질문이 있습니다.`
          : "아직 질문이 없습니다."}
      </span>
    );
  };
  return (
    <div className={className}>
      <MessagesIcon width="22" height="22" viewBox="0 0 24 24" />
      {countMessage()}
    </div>
  );
};

const FeedCountMessage = styled(BasicFeedCountMessage)`
  ${boxStyles.inlineFlexRowCenter};
  gap: 0.5rem;
  ${fontStyles.body2};
  ${fontStyles.regular};
  color: ${colors.brown40};
  line-height: 1;

  & svg {
    width: 22px;
    height: 22px;
    fill: ${colors.brown40};
  }

  @media ${devices.tablet} {
    ${fontStyles.body1};
    line-height: 1;

    & svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export default FeedCountMessage;
