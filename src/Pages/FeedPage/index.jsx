import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FeedLayout from "@layout/FeedLayout";
import useRequest from "@hooks/useRequest";
import BASIC_QUESTION from "@components/FeedPage/ModalForm/constant";
import ModalSection from "@components/FeedPage/ModalSection";
import FeedContainer from "@components/common/FeedContainer";

const FeedPage = () => {
  const [feedDataList, setFeedDataList] = useState([]);
  const { id } = useParams();

  const {
    data: feedCardData,
    isLoading,
    error,
    request: getFeedCardData,
  } = useRequest({ method: "GET", url: `subjects/${id}/questions` });

  const { data: postQuestionResponse, request: postQuestion } = useRequest({
    url: `subjects/${id}/questions`,
    method: "POST",
  });

  const handleQuestionSubmit = (value) => {
    BASIC_QUESTION.subjectId = id;
    BASIC_QUESTION.content = value;
    postQuestion(BASIC_QUESTION);
  };

  useEffect(() => {
    getFeedCardData();
  }, []);

  const { count, results: feedCardList } = feedCardData ?? {};

  useEffect(() => {
    if (!postQuestionResponse) {
      setFeedDataList(feedCardList);
    } else {
      setFeedDataList((prevDataList) => [
        postQuestionResponse,
        ...prevDataList,
      ]);
    }
  }, [feedCardData, postQuestionResponse]);

  return (
    <FeedLayout id={id} $feedType="question">
      <FeedContainer
        feedCardList={feedDataList}
        count={count}
        isLoading={isLoading}
        error={error}
      />
      <ModalSection
        subjectId={id}
        handleQuestionSubmit={handleQuestionSubmit}
      />
    </FeedLayout>
  );
};

export default FeedPage;
