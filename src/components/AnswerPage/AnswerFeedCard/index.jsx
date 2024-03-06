import { useState, useEffect } from "react";
import styled from "styled-components";
import useRequest from "@hooks/useRequest";
import FeedPageProfile from "@components/common/FeedPageProfile";
import Reaction from "@components/common/Reaction";
import getTimeDiff from "@components/common/FeedCard/getTimeDiff";
import Badge from "../../common/Badge";
import TextareaForm from "@components/common/TextareaForm";
import MoreDropdown from "../MoreDropdown";
import fontStyles from "@styles/fontStyles";
import boxStyles from "@styles/boxStyles";
import colors from "@styles/colors";
import devices from "@styles/devices";
import ProfileImage from "../../common/ProfileImage";

const BasicAnswerFeedCard = ({ feedCardData, isLoading, className }) => {
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

  const { data: subjectData, request: getSubjectData } = useRequest({
    url: `subjects/${subjectId}`,
  });

  const { imageSource, name } = subjectData ?? {};

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
    getSubjectData();
  }, []);

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
    feedAnswer = (
      <>
        <p>{answerContent && answerContent?.content}</p>
      </>
    );
  }

  return (
    <div className={className}>
      {/* 답변완료 */}
      <div className="cardHeader">
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
        <div className="card_question">
          <span className="span_gray">질문 · {getTimeDiff(createdAt)}</span>
          <p>{questionContent}</p>
        </div>
      )}
      {/* 답변 */}
      {feedCardData && answerContent ? (
        <ContentDiv>
          {subjectData && <ProfileImage src={imageSource} size="medium" />}
          <AnswerTextDiv>
            <AnswerDescDiv>
              <p>{name}</p>
              <span className="span_gray">
                {getTimeDiff(answerContent?.createdAt)}
              </span>
            </AnswerDescDiv>
            {answerContent?.isRejected ? (
              <p style={{ color: `${colors.red}` }}>답변거절</p>
            ) : (
              feedAnswer
            )}
          </AnswerTextDiv>
        </ContentDiv>
      ) : (
        <TextareaForm formType="answer" handleSubmit={handleSubmitAnswer} />
      )}
      <Reaction
        questionId={feedCardData?.id}
        like={feedCardData?.like}
        dislike={feedCardData?.dislike}
      />
    </div>
  );
};

const ContentDiv = styled.div`
  display: flex;
  gap: 12px;
`;

const AnswerTextDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;

  & > p {
    ${fontStyles.body3};
  }
`;

const AnswerDescDiv = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;

  & > p {
    ${fontStyles.body3};
    ${fontStyles.regular};

    @media ${devices.tablet} {
      ${fontStyles.body2};
    }
  }
`;

const AnswerFeedCard = styled(BasicAnswerFeedCard)`
  width: 100%;
  ${boxStyles.padding24};
  ${boxStyles.shadow1};
  background-color: ${colors.gray10};
  ${boxStyles.radius16};
  display: flex;
  flex-direction: column;
  gap: 24px;

  & .cardHeader {
    display: flex;
    justify-content: space-between;

    & ${MoreDropdown} > div {
      width: 31px;
      & > div {
        left: auto;
        right: 0;
      }
    }
  }

  & .span_gray {
    color: ${colors.gray40};
    ${fontStyles.caption};
  }

  & .card_question {
    display: flex;
    flex-direction: column;
    gap: 4px;

    & p {
      ${fontStyles.body3};
      color: ${colors.gray60};

      @media ${devices.tablet} {
        ${fontStyles.body2};
      }
    }
  }

  & ${Reaction} {
    border-top: 1px solid ${colors.gray30};
    padding-top: 24px;
  }
`;

export default AnswerFeedCard;
