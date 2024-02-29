import { useState, useEffect } from "react";
import styled from "styled-components";
import boxStyles from "@styles/boxStyles";
import { ReactComponent as LikeIcon } from "@icons/Like.svg";
import { ReactComponent as DislikeIcon } from "@icons/Dislike.svg";
import IconTextButton from "../IconTextButton";

const reactionData = {
  like: 3,
  dislike: 0,
};

const BasicReaction = ({ className }) => {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  const handleClick = () => {};

  useEffect(() => {
    setLike(reactionData?.like);
    setDislike(reactionData?.dislike);
  }, []);

  return (
    <ul className={className}>
      <li>
        <IconTextButton
          imageSource={
            <LikeIcon width="16" height="16" onClick={handleClick} />
          }
          text={`좋아요${like !== 0 ? ` ${like}` : ""}`}
        />
      </li>
      <li>
        <IconTextButton
          imageSource={
            <DislikeIcon width="16" height="16" onClick={handleClick} />
          }
          text={`싫어요${dislike !== 0 ? ` ${dislike}` : ""}`}
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
