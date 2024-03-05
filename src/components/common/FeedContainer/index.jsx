import { useEffect } from "react";
import styled from "styled-components";
import useRequest from "@hooks/useRequest";
import { boxStyles, colors, devices } from "@styles/styleVariables";
import FeedCountMessage from "@components/common/FeedCountMessage";
import NoFeedCard from "@components/common/NoFeedCard";
import AnswerFeedCard from "@components/AnswerPage/AnswerFeedCard";
import FeedCard from "../FeedCard";

const BasicFeedContainer = ({
  className,
  subjectId,
  cardType = "basicFeed",
}) => {
  const {
    data: feedCardData,
    isLoading,
    error,
    request: getFeedCardData,
  } = useRequest({ method: "GET", url: `subjects/${subjectId}/questions` });

  useEffect(() => {
    getFeedCardData();
  }, []);

  const { count, results: feedCardList } = feedCardData ?? {};

  const feedContent = () => {
    // 상태 관리 정리 필요합니다!!
    // 일단 이렇게 만들어두었어요
    if (isLoading) {
      // 로딩중일 때 노출될 컴포넌트 (추후 수정)
      return <div>로딩중</div>;
    }

    if (error) {
      // 에러 상태일 때 노출될 컴포넌트 (추후 수정)
      return <div>error</div>;
    }

    if (count === 0) {
      // 추후 NoFeedCard 컴포넌트로 대체합니다.
      return <NoFeedCard />;
    }

    if (feedCardList?.length > 0) {
      return (
        // 추후 FeedCardList 컴포넌트로 대체합니다.
        <ul>
          {feedCardList?.map((data) => (
            <li key={data?.id}>
              {cardType === "basicFeed" ? (
                <FeedCard
                  key={data?.id}
                  feedCard={data}
                  error={error}
                  isLoading={isLoading}
                />
              ) : (
                <AnswerFeedCard feedCardData={data} isLoading={isLoading} />
              )}
              {/* <FeedCard feedCardData={data} isLoading={isLoading} /> */}
            </li>
          ))}
        </ul>
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

  @media ${devices.tablet} {
    max-width: 716px;
  }
`;

export default FeedContainer;
