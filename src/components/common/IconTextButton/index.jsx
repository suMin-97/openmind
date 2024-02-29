import styled from "styled-components";
import { colors, fontStyles, boxStyles } from "@styles/styleVariables";

const basicIconTextButton = ({
  imageSource,
  text,
  className,
  onClick,
  isClicked,
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
  color: ${(props) => (props.isClicked ? colors.blue : colors.gray40)};
  & svg {
    fill: ${(props) => (props.isClicked ? colors.blue : colors.gray40)};
  }

  &:hover {
    color: ${(props) => (props.isClicked ? colors.blue : colors.gray60)};

    & svg {
      fill: ${(props) => (props.isClicked ? colors.blue : colors.gray60)};
    }
  }
`;

export default IconTextButton;
