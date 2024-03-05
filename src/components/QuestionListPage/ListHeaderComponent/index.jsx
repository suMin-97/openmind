import logo from "@images/logo.svg";
import { colors, fontStyles } from "@styles/styleVariables";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import arrowRightBrown from "@icons/arrow-right-brown.svg";

const ListHeaderComponent = () => {
  const navigate = useNavigate();

  const handleButton = () => {
    const id = localStorage.getItem("id");
    if (id) {
      navigate(`/post/${id}/answer`);
    } else {
      navigate("/");
    }
  };

  return (
    <ListHeader>
      <Link to="/">
        <img className="logo_image" src={logo} />
      </Link>

      <button className="go_answer_button" onClick={() => handleButton()}>
        <p>답변하러 가기</p>
        <img src={arrowRightBrown} />
      </button>
    </ListHeader>
  );
};

export default ListHeaderComponent;

const ListHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 40px 130px;

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
    display: inline-flex;
    padding: 12px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    width: 164px;
    height: 48px;
    border: 1px solid ${colors.brown40};
    background: ${colors.brown10};
    color: ${colors.brown40};
    ${fontStyles.body3};
    cursor: pointer;
  }
`;
