import styled from "styled-components";
import Reaction from "../Reaction";
import getTimeDiff from "./getTimeDiff";
import { useParams } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import { useEffect } from "react";
import ProfileImage from "../ProfileImg";

const ContainDiv = styled.div`
  width: 600px;
  height: 500px;
  margin: 10px;
  border: 3px solid black;
`;
const AnswerName = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
`;

const FeedCard = ({ feedCard, isLoading, error }) => {
  const { id } = useParams();

  const { data: ProfileData, request } = useRequest({
    method: "GET",
    url: `subjects/${id}`,
  });

  useEffect(() => {
    request();
  }, []);

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
          <ProfileImage src={ProfileData?.imageSource} size="medium" />
          <AnswerName>
            {ProfileData?.name ?? <span>정보를 불러오는데 실패했습니다.</span>}
          </AnswerName>
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
