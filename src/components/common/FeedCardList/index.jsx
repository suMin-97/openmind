import FeedCard from "@components/common/FeedCard";
import LoadingFeedCard from "@components/common/LoadingFeedCard";
import AnswerFeedCard from "@components/AnswerPage/AnswerFeedCard";

const FeedCardList = ({ feedCardList, isLoading, cardType, className }) => {
  return (
    <ul className={className}>
      {feedCardList?.map((data) => (
        <li key={data?.id}>
          {isLoading ? (
            <LoadingFeedCard />
          ) : cardType === "basicFeed" ? (
            <FeedCard key={data?.id} feedCard={data} isLoading={isLoading} />
          ) : (
            <AnswerFeedCard feedCardData={data} isLoading={isLoading} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default FeedCardList;
