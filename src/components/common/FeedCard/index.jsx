import { useEffect } from "react";
import styled from "styled-components";
import { fontStyles, boxStyles, colors, devices } from "@styles/styleVariables";
import useRequest from "../../../hooks/useRequest";
import getTimeDiff from "./getTimeDiff";
import Reaction from "../Reaction";
import Badge from "@components/common/Badge";
import ProfileImage from "@components/common/ProfileImage";

const BasicFeedCard = ({ feedCard, isLoading, error, className }) => {
  const {
    id: questionId,
    content: questionContent,
    subjectId,
    like,
    dislike,
    createdAt,
    answer,
  } = feedCard ?? null;

  const { data: subjectData, request: getSubjectData } = useRequest({
    url: `subjects/${subjectId}`,
  });

  const { imageSource, name } = subjectData ?? {};

  useEffect(() => {
    getSubjectData();
  }, []);

  return (
    <div className={className}>
      {/* 답변완료 */}
      <CardHeader>
        {feedCard?.answer ? <Badge isAnswered /> : <Badge />}
      </CardHeader>

      {/* 질문 */}
      {isLoading && <p>로딩중입니다</p>}
      {feedCard && (
        <CardQuestion>
          <span className="span_gray">질문 · {getTimeDiff(createdAt)}</span>
          <p>{questionContent}</p>
        </CardQuestion>
      )}

      {/* 답변 */}
      {isLoading && <p>로딩중입니다</p>}

      {feedCard && feedCard?.answer && (
        <ContentDiv>
          {subjectData && <ProfileImage src={imageSource} size="medium" />}
          <AnswerTextDiv>
            <AnswerDescDiv>
              <p>{name}</p>
              <span className="span_gray">
                {getTimeDiff(answer?.createdAt)}
              </span>
            </AnswerDescDiv>
            {answer?.isRejected ? (
              <p style={{ color: `${colors.red}` }}>답변거절</p>
            ) : (
              <p>{answer && answer?.content}</p>
            )}
          </AnswerTextDiv>
        </ContentDiv>
      )}

      {error && <p>삐빅 에러 입니다</p>}
      {feedCard && (
        <Reaction questionId={questionId} like={like} dislike={dislike} />
      )}
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

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardQuestion = styled.div`
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
`;

const FeedCard = styled(BasicFeedCard)`
  width: 100%;
  ${boxStyles.padding24};
  ${boxStyles.shadow1};
  background-color: ${colors.gray10};
  ${boxStyles.radius16};
  display: flex;
  flex-direction: column;
  gap: 24px;

  & .span_gray {
    color: ${colors.gray40};
    ${fontStyles.caption};
  }

  & ${Reaction} {
    border-top: 1px solid ${colors.gray30};
    padding-top: 24px;
  }
`;

export default FeedCard;
