import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import FeedLayout from "@layout/FeedLayout";
import useRequest from "@hooks/useRequest";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import BASIC_QUESTION from "@components/FeedPage/ModalForm/constant";
import ModalSection from "@components/FeedPage/ModalSection";
import FeedContainer from "@components/common/FeedContainer";

const PAGE_LIMIT = 8;

const FeedPage = () => {
  const [page, setPage] = useState(1);
  const [feedDataList, setFeedDataList] = useState([]);
  const { id } = useParams();
  const target = useRef();

  const [observe, unobserve] = useIntersectionObserver(() => {
    setPage((prevPage) => prevPage + 1);
  });

  const {
    data: feedCardData,
    isLoading,
    error,
    request: getFeedCardData,
  } = useRequest({
    method: "GET",
    url: `subjects/${id}/questions`,
  });

  const { data: postQuestionResponse, request: postQuestion } = useRequest({
    url: `subjects/${id}/questions`,
    method: "POST",
  });

  const handleQuestionSubmit = (value) => {
    BASIC_QUESTION.subjectId = id;
    BASIC_QUESTION.content = value;
    postQuestion(BASIC_QUESTION);
  };

  const { count, next, results: feedCardList } = feedCardData ?? {};

  useEffect(() => {
    getFeedCardData({ limit: PAGE_LIMIT, offset: (page - 1) * PAGE_LIMIT });
  }, [page]);

  useEffect(() => {
    setFeedDataList((prevDataList) => [
      ...(prevDataList ?? []),
      ...(feedCardList ?? []),
    ]);

    if (page === 1) observe(target.current);

    if (!next || feedDataList.length >= count) {
      unobserve(target.current);
    }
  }, [feedCardList, count, next]);

  useEffect(() => {
    if (postQuestionResponse) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setPage(1);
      setFeedDataList([]);
    }
  }, [postQuestionResponse]);

  return (
    <FeedLayout id={id} $feedType="question">
      <FeedContainer
        feedCardList={feedDataList}
        count={count}
        isLoading={isLoading}
        error={error}
      />
      <div ref={target} style={{ width: "100%", height: 30 }} />
      <ModalSection
        subjectId={id}
        handleQuestionSubmit={handleQuestionSubmit}
      />
    </FeedLayout>
  );
};

export default FeedPage;
