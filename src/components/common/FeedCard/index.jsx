import styled from "styled-components";
import FeedPageProfile from "../../common/FeedPageProfile";
import Reaction from "../Reaction";
import getTimeDiff from "./getTimeDiff";

const ContainDiv = styled.div`
  width: 600px;
  height: 500px;
  margin: 10px;
  border: 3px solid black;
`;

const FeedCard = ({ feedCard, isLoading, error }) => {
  return (
    <ContainDiv>
      {/* 답변완료 */}
      {isLoading && <p>로딩중입니다</p>}
      {feedCard && feedCard?.answer ? <div>답변 완료</div> : <div>미답변</div>}
      {error && <p>삐빅 에러 입니다</p>}
      {/* 질문 */}
      {isLoading && <p>로딩중입니다</p>}
      {feedCard && (
        <div>
          <p>{getTimeDiff(feedCard?.createdAt)}</p>
          <p>{feedCard?.content}</p>
        </div>
      )}
      {error && <p>삐빅 에러 입니다</p>}
      {/* 답변 */}
      {isLoading && <p>로딩중입니다</p>}
      {feedCard && feedCard?.answer ? (
        <div>
          <FeedPageProfile subjectId={feedCard?.subjectId} />
          {feedCard?.answer?.isRejected ? (
            <p style={{ color: "red" }}>답변거절</p>
          ) : (
            <p>{feedCard?.answer?.content}</p>
          )}
        </div>
      ) : null}
      {error && <p>삐빅 에러 입니다</p>}
      <Reaction
        questionId={feedCard?.id}
        like={feedCard?.like}
        dislike={feedCard?.dislike}
      />
    </ContainDiv>
  );
};

export default FeedCard;
