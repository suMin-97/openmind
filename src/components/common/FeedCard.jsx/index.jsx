import { useEffect } from "react";
import styled from "styled-components";
import FeedPageProfile from "../../common/FeedPageProfile";
import Reaction from "../Reaction";

function dateDiff(createdAt) {
  const present = Date.now();
  const createdLinkDate = new Date(createdAt);
  const diff = present - createdLinkDate;

  const TIME_TO_MS = {
    twoMinutes: 120000,
    oneHour: 3600000,
    twoHours: 7200000,
    oneDay: 86400000,
    twoDays: 172800000,
    oneMonth: 2628000000,
    twoMonths: 5256000000,
    oneYear: 31540000000,
    twoYears: 63070000000,
  };

  if (diff < TIME_TO_MS.twoMinutes) {
    return "1분전";
  } else if (diff < TIME_TO_MS.oneHour) {
    return `${Math.floor(diff / 1000 / 60)}분전`;
  } else if (diff < TIME_TO_MS.twoHours) {
    return "1시간전";
  } else if (diff < TIME_TO_MS.oneDay) {
    return `${Math.floor(diff / 1000 / 60 / 60)}시간전`;
  } else if (diff < TIME_TO_MS.twoDays) {
    return "1일전";
  } else if (diff < TIME_TO_MS.oneMonth) {
    return `${Math.floor(diff / 1000 / 60 / 60 / 24)}일전`;
  } else if (diff < TIME_TO_MS.twoMonths) {
    return "1달전";
  } else if (diff < TIME_TO_MS.oneYear) {
    return `${Math.floor(diff / 1000 / 60 / 60 / 24 / 30)}달전`;
  } else if (diff < TIME_TO_MS.twoYears) {
    return "1년전";
  } else {
    return `${Math.floor(diff / 1000 / 60 / 60 / 24 / 30 / 12)}년전`;
  }
}

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
          <p>{dateDiff(feedCard?.createdAt)}</p>
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
