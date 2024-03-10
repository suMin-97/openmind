import styled from "styled-components";
import { colors, fontStyles, boxStyles } from "@styles/styleVariables";

const basicIconTextButton = ({
  imageSource,
  text,
  className,
  onClick,
  isActive = false,
  isDislike,
}) => {
  return (
    <div className={className} onClick={onClick}>
      {imageSource}
      <span>{text}</span>
    </div>
  );
};

const IconTextButton = styled(basicIconTextButton)`
  ${fontStyles.caption};
  ${fontStyles.medium};
  ${boxStyles.inlineFlexRowCenter};
  line-height: 1rem; // 설정대로 하면 위치가 이상해져서 재조정
  cursor: pointer;
  gap: 0.375rem;
  color: ${({ isActive, isDislike }) =>
    isActive ? (isDislike ? colors.gray60 : colors.blue) : colors.gray40};
  & svg {
    fill: ${({ isActive, isDislike }) =>
      isActive ? (isDislike ? colors.gray60 : colors.blue) : colors.gray40};
  }

  &:hover {
    color: ${({ isDislike }) => (isDislike ? colors.gray60 : colors.blue)};

    & svg {
      fill: ${({ isDislike }) => (isDislike ? colors.gray60 : colors.blue)};
    }
  }

  &:active {
    color: ${(props) => (props.isDislike ? colors.gray60 : colors.blue)};

    & svg {
      fill: ${(props) => (props.isDislike ? colors.gray60 : colors.blue)};
    }
  }
`;

export default IconTextButton;
