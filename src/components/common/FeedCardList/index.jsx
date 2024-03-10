import FeedCard from "@components/common/FeedCard";
import LoadingFeedCard from "@components/common/LoadingFeedCard";
import AnswerFeedCard from "@components/AnswerPage/AnswerFeedCard";

const FeedCardList = ({
  feedCardList,
  isLoading,
  cardType,
  className,
  subjectData,
}) => {
  const { imageSource, name } = subjectData ?? {};

  return (
    <ul className={className}>
      {feedCardList?.map((data) => (
        <li key={data?.id}>
          {isLoading ? (
            <LoadingFeedCard />
          ) : cardType === "basicFeed" ? (
            <FeedCard
              key={data?.id}
              feedCard={data}
              isLoading={isLoading}
              imageSource={imageSource}
              name={name}
            />
          ) : (
            <AnswerFeedCard
              feedCardData={data}
              isLoading={isLoading}
              imageSource={imageSource}
              name={name}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default FeedCardList;
