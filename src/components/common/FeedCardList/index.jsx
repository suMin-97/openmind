import FeedCard from "@components/common/FeedCard";
import LoadingFeedCard from "@components/common/LoadingFeedCard";
import AnswerFeedCard from "@components/AnswerPage/AnswerFeedCard";
import useRequest from "../../../hooks/useRequest";
import { useEffect } from "react";

const FeedCardList = ({ feedCardList, isLoading, cardType, className }) => {
  const {
    data: subjectData,
    isLoading: IsUserDataLoading,
    request: getSubjectData,
  } = useRequest({
    url: `subjects/${feedCardList[0]?.subjectId}`,
  });

  const { imageSource, name } = subjectData ?? {};

  useEffect(() => {
    getSubjectData();
  }, []);

  return (
    <ul className={className}>
      {feedCardList?.map((data) => (
        <li key={data?.id}>
          {isLoading && IsUserDataLoading ? (
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
