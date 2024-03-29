import styled from "styled-components";
import { fontStyles, boxStyles, colors, devices } from "@styles/styleVariables";
import getTimeDiff from "./getTimeDiff";
import Reaction from "@components/common/Reaction";
import Badge from "@components/common/Badge";
import ProfileImage from "@components/common/ProfileImage";

const BasicFeedCard = ({ feedCard, className, imageSource, name }) => {
  const {
    id: questionId,
    content: questionContent,
    like,
    dislike,
    createdAt,
    answer,
  } = feedCard ?? null;

  return (
    <div className={className}>
      {/* 답변완료 */}
      <CardHeader>
        {feedCard?.answer ? <Badge isAnswered /> : <Badge />}
      </CardHeader>

      {/* 질문 */}
      {feedCard && (
        <CardQuestion>
          <span className="span_gray">질문 · {getTimeDiff(createdAt)}</span>
          <p>{questionContent}</p>
        </CardQuestion>
      )}

      {/* 답변 */}
      {feedCard && feedCard?.answer && (
        <ContentDiv>
          {imageSource && <ProfileImage src={imageSource} size="medium" />}
          <AnswerTextDiv>
            <AnswerDescDiv>
              <p>{name}</p>
              <span className="span_gray">
                {getTimeDiff(answer?.createdAt)}
              </span>
            </AnswerDescDiv>
            {answer?.isRejected ? (
              <p style={{ color: `${colors.red}` }}>답변 거절</p>
            ) : (
              <p>{answer && answer?.content}</p>
            )}
          </AnswerTextDiv>
        </ContentDiv>
      )}

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
    line-height: 1.375;
  }

  & ${Reaction} {
    border-top: 1px solid ${colors.gray30};
    padding-top: 24px;
  }

  & p {
    word-break: break-all;
  }
`;

export default FeedCard;
