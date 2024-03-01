import styled from "styled-components";

const ContainDiv = styled.div`
  background-color: gray;
  width: 400px;
  height: 100px;
  position: fixed;
  bottom: 100px;
`;

// 재사용성을 위해 children props 사용함
const Toast = ({ children }) => {
  return <ContainDiv>{children}</ContainDiv>;
};

export default Toast;
