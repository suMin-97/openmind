import logo from "@images/logo.svg";
import { colors, fontStyles } from "@styles/styleVariables";
import styled from "styled-components";

const ListHeaderComponent = () => {
  return (
    <ListHeader>
      <img className="logo_image" src={logo} />
      <button className="go_answer_button">답변하러 가기</button>
    </ListHeader>
  );
};

export default ListHeaderComponent;

const ListHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 40px 130px;

  .logo_image {
    display: flex;
    width: 146px;
    height: 57px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
  .go_answer_button {
    border-radius: 8px;
    border: 1px solid ${colors.brown40};
    background: ${colors.brown10};
    display: inline-flex;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 113px 22px;
  }
`;
