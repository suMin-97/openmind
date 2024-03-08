import logo from "@images/logo.svg";
import { colors, fontStyles, devices } from "@styles/styleVariables";
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
        <img className="logo_image" src={logo} draggable="false" />
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
  @media ${devices.mobile} {
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 54px;
  }
  @media ${devices.tablet} {
    flex-direction: row;
    padding: 45px 50px;
  }
  @media ${devices.desktop} {
    flex-direction: row;
    padding: 45px 130px;
  }
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
    justify-content: center;
    align-items: center;
    border: 1px solid ${colors.brown40};
    background: ${colors.brown10};
    color: ${colors.brown40};
    cursor: pointer;
    img {
      width: 18px;
      height: 18px;
    }
    @media ${devices.mobile} {
      width: 128px;
      height: 34px;
      padding: 8px 12px;
      gap: 4px;
      p {
        ${fontStyles.caption};
      }
    }
    @media ${devices.tablet} {
      gap: 8px;
      width: 164px;
      height: 48px;
      padding: 12px 24px;
      p {
        ${fontStyles.body3};
      }
    }
  }
`;
