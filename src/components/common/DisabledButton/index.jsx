import styled from "styled-components";
import { colors, boxStyles, fontStyles } from "@styles/styleVariables";

const DisabledButton = ({ children, id }) => {
  return <StyledButton htmlFor={id}>{children}</StyledButton>;
};

const StyledButton = styled.label`
  ${boxStyles.flexRowCenter};
  ${boxStyles.paddingButtonM};
  ${boxStyles.radius8};
  border: 1px solid ${colors.brown30};
  background-color: ${colors.brown30};
  color: ${colors.gray10};
  cursor: pointer;
  ${fontStyles.body3};
  ${fontStyles.regular};
  width: 100%;
  height: 46px;
`;

export default DisabledButton;
