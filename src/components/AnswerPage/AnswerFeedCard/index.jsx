import { useState, useEffect } from "react";
import styled from "styled-components";
import useRequest from "@hooks/useRequest";
import FeedPageProfile from "@components/common/FeedPageProfile";
import Reaction from "@components/common/Reaction";
import getTimeDiff from "@components/common/FeedCard/getTimeDiff";
import Badge from "../../common/Badge";
import TextareaForm from "@components/common/TextareaForm";
import MoreDropdown from "../MoreDropdown";

const ContainDiv = styled.div`
  width: 600px;
  height: 500px;
  margin: 10px;
  border: 3px solid black;
`;

const FeedCard = ({ feedCardData, isLoading }) => {
  const [answerContent, setAnswerContent] = useState(null);
  const [isModify, setIsModify] = useState(false);

  const {
    id: questionId,
    content: questionContent,
    subjectId,
    like,
    dislike,
    createdAt,
    answer,
  } = feedCardData ?? {};

  const {
    data: submitAnswerResponse,
    isLoading: submitAnswerLoading,
    error,
    request: useSubmitAnswer,
  } = useRequest({
    url: `questions/${questionId}/answers`,
    method: "POST",
  });

  const {
    data: modifyAnswerResponse,
    isLoading: modifyAnswerLoading,
    request: useModifyAnswer,
  } = useRequest({
    url: `answers/${answerContent?.id}`,
    method: "PATCH",
  });

  const handleSubmitAnswer = (value) => {
    useSubmitAnswer({ content: value, isRejected: false });
  };

  const handleModifyAnswer = (value) => {
    useModifyAnswer({ content: value, isRejected: false });
    setIsModify((prevState) => !prevState);
  };

  useEffect(() => {
    setAnswerContent(answer);
    if (submitAnswerResponse) {
      setAnswerContent(submitAnswerResponse);
    }
  }, [submitAnswerResponse]);

  useEffect(() => {
    if (modifyAnswerResponse) {
      setAnswerContent(modifyAnswerResponse);
    }
  }, [modifyAnswerResponse]);

  let feedAnswer;
  if (isModify) {
    console.log(answerContent);
    feedAnswer = (
      <TextareaForm
        formType="modify"
        handleSubmit={handleModifyAnswer}
        prevValue={`${answerContent?.content}`}
      />
    );
  } else {
    feedAnswer = <p>{answerContent && answerContent?.content}</p>;
  }

  return (
    <ContainDiv>
      {/* 답변완료 */}
      <div>
        {feedCardData && answerContent ? <Badge isAnswered /> : <Badge />}
        <MoreDropdown
          isAnswered={answerContent}
          answerId={answerContent?.id}
          questionId={questionId}
          setIsModify={setIsModify}
          setAnswerContent={setAnswerContent}
        />
      </div>

      {/* 질문 */}
      {feedCardData && (
        <div>
          <p>{getTimeDiff(createdAt)}</p>
          <p>{questionContent}</p>
        </div>
      )}
      {/* 답변 */}
      {feedCardData && answerContent ? (
        <div>
          <FeedPageProfile subjectId={subjectId} />
          {answerContent?.isRejected ? (
            <p style={{ color: "red" }}>답변거절</p>
          ) : (
            feedAnswer
          )}
        </div>
      ) : (
        <TextareaForm formType="answer" handleSubmit={handleSubmitAnswer} />
      )}
      <Reaction
        questionId={feedCardData?.id}
        like={feedCardData?.like}
        dislike={feedCardData?.dislike}
      />
    </ContainDiv>
  );
};

export default FeedCard;
