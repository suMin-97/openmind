import styled from "styled-components";
import { boxStyles, colors } from "@styles/styleVariables";
import FeedCountMessage from "@components/common/FeedCountMessage";
import NoFeedCard from "@components/common/NoFeedCard";
import FeedCardList from "@components/common/FeedCardList";

const BasicFeedContainer = ({
  className,
  feedCardList,
  cardType = "basicFeed",
  count,
  isLoading,
  error,
  subjectData,
}) => {
  const feedContent = () => {
    if (error) {
      return <div>질문을 불러오는데 실패했습니다.</div>;
    }

    if (count === 0) {
      return <NoFeedCard />;
    }

    if (feedCardList?.length > 0) {
      return (
        <FeedCardList
          feedCardList={feedCardList}
          isLoading={isLoading}
          cardType={cardType}
          subjectData={subjectData}
        />
      );
    }
  };

  return (
    <div className={className}>
      <FeedCountMessage count={count ?? 0} isLoading={isLoading} />
      {feedContent()}
    </div>
  );
};

const FeedContainer = styled(BasicFeedContainer)`
  ${boxStyles.flexColumnCenter};
  gap: 1rem;
  width: 100%;
  min-height: 330px;
  ${boxStyles.padding16};
  border: 1px solid ${colors.brown30};
  ${boxStyles.radius16};
  background-color: ${colors.brown10};

  & > ul {
    ${boxStyles.flexColumnCenter};
    gap: 1rem;
    width: 100%;

    & > li {
      width: 100%;
    }
  }
`;

export default FeedContainer;
