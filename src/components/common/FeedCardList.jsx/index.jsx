import { useEffect } from "react";
import useRequest from "../../../hooks/useRequest.js";
import FeedCard from "../FeedCard.jsx/index.jsx";
import NoFeedCard from "../NoFeedCard/index.jsx";

const FeedCardList = ({ subjectId }) => {
  const FeedCardsUrl = `subjects/${subjectId}/questions`;
  const {
    data: feedCards,
    error,
    isLoading,
    request: getFeedCardsRequest,
  } = useRequest({ url: FeedCardsUrl, method: "GET" });

  useEffect(() => {
    getFeedCardsRequest();
  }, []);

  return (
    <div>
      {isLoading && <p>로딩중</p>}
      {feedCards && feedCards?.count ? (
        <>
          <h1>{`${feedCards?.count}개의 질문이 있습니다`}</h1>
          <ul>
            <li>
              {feedCards &&
                feedCards?.results.map((feedCard) => (
                  <FeedCard
                    key={feedCard?.id}
                    feedCard={feedCard}
                    error={error}
                    isLoading={isLoading}
                  />
                ))}
            </li>
          </ul>
        </>
      ) : (
        <>
          <p>아직 질문이 없습니다</p>
          <NoFeedCard />
        </>
      )}
      {error && <p>삐빅 에러 입니다</p>}
    </div>
  );
};

export default FeedCardList;
