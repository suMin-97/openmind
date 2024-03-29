import styled from "styled-components";
import boxStyles from "@styles/boxStyles";
import colors from "@styles/colors";
import fontStyles from "@styles/fontStyles";

const BasicSubmitButton = ({
  children,
  isDisabled,
  className,
  handleClick,
}) => {
  return (
    <button className={className} type="submit" onClick={handleClick}>
      {children}
    </button>
  );
};

const SubmitButton = styled(BasicSubmitButton)`
  ${boxStyles.flexRowCenter};
  ${boxStyles.paddingButtonM};
  ${boxStyles.radius8};
  border: 2px solid
    ${(props) => (props.isDisabled ? colors.brown30 : colors.brown40)};
  background-color: ${(props) =>
    props.isDisabled ? colors.brown30 : colors.brown40};
  color: ${colors.gray10};
  cursor: pointer;
  ${fontStyles.body3};
  ${fontStyles.regular};
  width: 100%;
  height: 46px;

  &:disabled {
    border-color: ${colors.brown30};
  }

  &:hover {
    ${(props) => !props.isDisabled && `border-color: ${colors.brown50};`};
  }

  &:active {
    ${(props) => !props.isDisabled && `background-color: ${colors.brown50};`};
  }
`;

export default SubmitButton;
