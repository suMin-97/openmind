import { useEffect } from "react";
import useRequest from "../../../hooks/useRequest.js";
import FeedCard from "../FeedCard.jsx/index.jsx";

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
    </div>
  );
};

export default FeedCardList;
