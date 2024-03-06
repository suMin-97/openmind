import styled from "styled-components";
import {
  colors,
  boxStyles,
  fontStyles,
  devices,
} from "../../../styles/styleVariables";

// 재사용성을 위해 children props 사용함
const Toast = ({ children }) => {
  return <ContainDiv>{children}</ContainDiv>;
};

const ContainDiv = styled.div`
  display: inline-flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  ${boxStyles.radius8};
  background: ${colors.gray60};
  ${boxStyles.shadow2};

  color: ${colors.gray10};
  ${fontStyles.medium};
  ${fontStyles.caption};

  position: fixed;
  bottom: 100px;

  @media ${devices.tablet} {
    bottom: 60px;
  }
`;

export default Toast;
