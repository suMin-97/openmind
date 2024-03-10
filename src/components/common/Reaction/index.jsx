import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as LikeIcon } from "@icons/Like.svg";
import { ReactComponent as DislikeIcon } from "@icons/Dislike.svg";
import useRequest from "@hooks/useRequest";
import IconTextButton from "@components/common/IconTextButton";

const BasicReaction = ({ className, like = 0, dislike = 0, questionId }) => {
  const [likeCount, setLikeCount] = useState(like);
  const [dislikeCount, setDislikeCount] = useState(dislike);
  const [likeClick, setLikeClick] = useState(false);
  const [dislikeClick, setDislikeClick] = useState(false);
  const { request: postReactionRequest } = useRequest({
    url: `questions/${questionId}/reaction`,
    method: "POST",
  });

  const LIKE = { type: "like" };
  const DISLIKE = { type: "dislike" };

  const handleLikeClick = () => {
    if (!likeClick) {
      setLikeCount(likeCount + 1);
      setLikeClick(true);
      postReactionRequest(LIKE);
    } else {
      setLikeCount(likeCount - 1);
      setLikeClick(false);
    }
    if (dislikeClick) {
      setDislikeCount(dislikeCount - 1);
      setDislikeClick(false);
    }
  };
  ``;

  const handleDislikeClick = () => {
    if (!dislikeClick) {
      setDislikeCount(dislikeCount + 1);
      setDislikeClick(true);
      postReactionRequest(DISLIKE);
    } else {
      setDislikeCount(dislikeCount - 1);
      setDislikeClick(false);
    }
    if (likeClick) {
      setLikeCount(likeCount - 1);
      setLikeClick(false);
    }
  };

  return (
    <ul className={className}>
      <li>
        <IconTextButton
          imageSource={<LikeIcon width="16" height="16" />}
          text={`좋아요${likeCount !== 0 ? ` ${likeCount}` : ""}`}
          onClick={handleLikeClick}
          isActive={likeClick}
        />
      </li>
      <li>
        <IconTextButton
          imageSource={<DislikeIcon width="16" height="16" />}
          text={`싫어요${dislikeCount !== 0 ? ` ${dislikeCount}` : ""}`}
          onClick={handleDislikeClick}
          isActive={dislikeClick}
        />
      </li>
    </ul>
  );
};

const Reaction = styled(BasicReaction)`
  display: flex;
  flex-flow: row;
  gap: 2rem;
  white-space: nowrap;
`;

export default Reaction;
