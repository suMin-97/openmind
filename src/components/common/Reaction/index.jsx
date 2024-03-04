import { useState, useEffect } from "react";
import styled from "styled-components";
import boxStyles from "@styles/boxStyles";
import { ReactComponent as LikeIcon } from "@icons/Like.svg";
import { ReactComponent as DislikeIcon } from "@icons/Dislike.svg";
import IconTextButton from "@components/common/IconTextButton";
import useRequest from "../../../hooks/useRequest";

const BasicReaction = ({ className, like = 0, dislike = 0, questionId }) => {
  const [currentLike, setCurrentLike] = useState(like);
  const [currentDislike, setCurrentDislike] = useState(dislike);
  const { request: postReactionRequest } = useRequest({
    url: `questions/${questionId}/reaction`,
    method: "POST",
  });

  const LIKE = { type: "like" };
  const DISLIKE = { type: "dislike" };

  const handleLikeClick = () => {
    setCurrentLike(currentLike + 1);
    postReactionRequest(LIKE);
  };

  const handleDislikeClick = () => {
    setCurrentDislike(currentDislike + 1);
    postReactionRequest(DISLIKE);
  };

  return (
    <ul className={className}>
      <li>
        <IconTextButton
          imageSource={<LikeIcon width="16" height="16" />}
          text={`좋아요${currentLike !== 0 ? ` ${currentLike}` : ""}`}
          onClick={handleLikeClick}
        />
      </li>
      <li>
        <IconTextButton
          imageSource={<DislikeIcon width="16" height="16" />}
          text={`싫어요${currentDislike !== 0 ? ` ${currentDislike}` : ""}`}
          onClick={handleDislikeClick}
        />
      </li>
    </ul>
  );
};

const Reaction = styled(BasicReaction)`
  ${boxStyles.inlineFlexRowCenter};
  gap: 2rem;
`;

export default Reaction;
