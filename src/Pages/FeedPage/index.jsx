import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import FeedLayout from "@layout/FeedLayout";
import useRequest from "@hooks/useRequest";
import BASIC_QUESTION from "@components/FeedPage/ModalForm/constant";
import ModalSection from "@components/FeedPage/ModalSection";
import FeedContainer from "@components/common/FeedContainer";
import styled from "styled-components";

const FeedPage = () => {
  const { id } = useParams();
  const [hasNext, setHasNext] = useState(true);
  const target = useRef();
  const offset = useRef(0);
  const location = useLocation();

  const LIMIT = 5;

  const {
    data: feedCardData,
    isLoading,
    error,
    request: getFeedCardData,
  } = useRequest({
    method: "GET",
    url: `subjects/${id}/questions/?limit=${LIMIT}&offset=${offset.current}`,
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

  useEffect(() => {
    getFeedCardData();
    offset.current += LIMIT;
  }, [offset.current]);

  const { count, next, results: feedCardList } = feedCardData ?? {};

  useEffect(() => {
    if (postQuestionResponse) {
      getFeedCardData();
    }
  }, [postQuestionResponse]);

  // const observeCallback = (entries) => {
  //   if (isLoading) return;

  //   entries.forEach((entry) => {
  //     if (entry.isIntersecting) {
  //       getFeedCardData(offset.current);
  //       setHasNext(next);
  //     }
  //   });
  // };

  // const observer = new IntersectionObserver(observeCallback, {
  //   threshold: 0.2,
  // });

  // useEffect(() => {
  //   observer.observe(target.current);
  // }, [location, offset]);

  return (
    <FeedLayout id={id} $feedType="question">
      <FeedContainer
        feedCardList={feedCardList}
        count={count}
        isLoading={isLoading}
        error={error}
      />
      {/* {hasNext && <TestBox ref={target} />} */}
      <ModalSection
        subjectId={id}
        handleQuestionSubmit={handleQuestionSubmit}
      />
    </FeedLayout>
  );
};

export default FeedPage;

const TestBox = styled.div`
  width: 100%;
  height: 120px;
`;
