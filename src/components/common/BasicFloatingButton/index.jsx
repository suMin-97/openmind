import styled from "styled-components";
import { colors, boxStyles, fontStyles } from "@styles/styleVariables";

const BasicRoundedButton = ({ className, children, disabled, handleClick }) => {
  return (
    <button className={className} disabled={disabled} onClick={handleClick}>
      {children}
    </button>
  );
};

const BasicFloatingButton = styled(BasicRoundedButton)`
  ${fontStyles.regular};
  background-color: ${(props) =>
    props.disabled ? colors.brown20 : colors.brown40};
  color: ${colors.gray10};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  border: none;
  ${boxStyles.radius200};
  ${boxStyles.shadow2};
  white-space: nowrap;

  &:hover {
    /* 크기 지정해야 border가 생겼을 때 원래 버튼 크기와 차이가 나지 않습니다 */
    ${(props) => (props.disabled ? "" : `border: 1px solid ${colors.brown50}`)};
  }

  &:active {
    ${(props) =>
      props.disabled ? "" : `background-color : ${colors.brown50}`};
  }
`;

export default BasicFloatingButton;
