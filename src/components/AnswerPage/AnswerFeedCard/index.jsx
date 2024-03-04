import styled from "styled-components";
import FeedPageProfile from "@components/common/FeedPageProfile";
import Reaction from "@components/common/Reaction";
import getTimeDiff from "@components/common/FeedCard/getTimeDiff";
import Badge from "../../common/Badge";
import InputTextareaForm from "../../common/InputTextAreaForm";
import useRequest from "../../../hooks/useRequest";
import MoreDropdown from "../MoreDropdown";

const ContainDiv = styled.div`
  width: 600px;
  height: 500px;
  margin: 10px;
  border: 3px solid black;
`;

const FeedCard = ({ feedCardData, isLoading }) => {
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

  const handleSubmitAnswer = (value) => {
    useSubmitAnswer({ content: value, isRejected: false });
  };

  return (
    <ContainDiv>
      {/* 답변완료 */}
      <div>
        {feedCardData && answer ? <Badge isAnswered /> : <Badge />}
        <MoreDropdown isAnswered={answer} />
      </div>

      {/* 질문 */}
      {feedCardData && (
        <div>
          <p>{getTimeDiff(createdAt)}</p>
          <p>{questionContent}</p>
        </div>
      )}
      {/* 답변 */}
      {feedCardData && answer ? (
        <div>
          <FeedPageProfile subjectId={subjectId} />
          {answer?.isRejected ? (
            <p style={{ color: "red" }}>답변거절</p>
          ) : (
            <p>{answer?.content}</p>
          )}
        </div>
      ) : (
        <InputTextareaForm
          formType="answer"
          handleSubmit={handleSubmitAnswer}
        />
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
