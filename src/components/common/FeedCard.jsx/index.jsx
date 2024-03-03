import { useEffect } from "react";
import styled from "styled-components";
import FeedPageProfile from "../../FeedPage/FeedPageProfile";
import Reaction from "../Reaction";

const ContainDiv = styled.div`
  width: 600px;
  height: 500px;
  margin: 10px;
  border: 3px solid black;
`;

const moc = {
  id: 6704,
  subjectId: 3921,
  content: "고얌미가 아니라 고양이 아닌가요?3",
  like: 21,
  dislike: 2,
  createdAt: "2024-03-03T05:17:22.273307Z",
  answer: {
    id: 3182,
    questionId: 6704,
    content: "고양이에용",
    isRejected: false,
    createdAt: "2024-03-03T05:19:43.541928Z",
  },
};

const FeedCard = ({ feedCard }) => {
  useEffect(() => {
    console.log(1);
  }, []);

  return (
    <ContainDiv>
      <div>
        {feedCard && feedCard?.answer ? <p>답변 완료</p> : <p>미답변</p>}
      </div>
      <div>
        {feedCard && (
          <>
            <p>{feedCard?.createdAt}</p>
            <p>{feedCard?.content}</p>
          </>
        )}
      </div>
      {feedCard && feedCard?.answer ? (
        <div>
          <FeedPageProfile subjectId={feedCard?.subjectId} />
          <p>{feedCard?.answer?.content}</p>
        </div>
      ) : null}
      <Reaction
        questionId={feedCard?.id}
        like={feedCard?.like}
        dislike={feedCard?.dislike}
      />
    </ContainDiv>
  );
};

export default FeedCard;
