import { Link } from "react-router-dom";
import SubmitButton from "../../components/common/SubmitButton";
import logo from "../../assets/images/logo.svg";
import backgroundImg from "../../assets/images/background-image.png";
import useRequest from "../../hooks/useRequest";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BASIC_SUBJECT, POST_URL } from "./constants";
import { useState } from "react";
import styled from "styled-components";
import {
  colors,
  boxStyles,
  fontStyles,
  devices,
} from "../../styles/styleVariables";
import personIcon from "../../assets/icons/Person.svg";
import arrowRightBrown from "../../assets/icons/arrow-right-brown.svg";

const MainPage = () => {
  const [value, setValue] = useState("");
  const regex = /^[\s\S]*\S[\s\S]*$/; // 스페이스,엔터만 입력한 경우 같이 값은 있지만 사실상 내용이 없는 공란을 검사하는 정규식, false이면 공란임
  const {
    data,
    isLoading,
    error,
    request: postSubjectRequest,
  } = useRequest({ url: POST_URL, method: "POST" });
  const navigate = useNavigate();

  const navigateAnswerPage = (id) => {
    navigate(`/post/${id}/answer`);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.key === "Enter") {
      event.preventDefault();
      if (regex.test(event.target.value)) {
        BASIC_SUBJECT.name = event.target.value;
        const newSubject = { ...BASIC_SUBJECT };
        postSubjectRequest(newSubject);
      }
    }
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    if (regex.test(value)) {
      BASIC_SUBJECT.name = value;
      const newSubject = { ...BASIC_SUBJECT };
      postSubjectRequest(newSubject);
    }
  };

  useEffect(() => {
    if (data?.id) {
      navigateAnswerPage(data?.id);
      localStorage.setItem("id", data?.id);
    } else if (error) {
      alert("다시 시도해주세요"); // 에러처리 정해야함
    }
  }, [isLoading]);

  return (
    <ContainDiv>
      <Header>
        <img src={logo} />
        <Link to="/list">
          <button>
            <p>질문하러 가기</p>
            <img src={arrowRightBrown} />
          </button>
        </Link>
      </Header>
      <StyledDiv>
        <StyledForm onSubmit={handleSubmitClick}>
          <InputDiv>
            <label htmlFor="name">
              <img src={personIcon} />
            </label>
            <input
              id="name"
              placeholder="이름을 입력하세요"
              onChange={handleChange}
            />
          </InputDiv>
          <SubmitButton>질문 받기</SubmitButton>
        </StyledForm>
      </StyledDiv>
      <Footer>
        <img src={backgroundImg} />
      </Footer>
    </ContainDiv>
  );
};

const ContainDiv = styled.div`
  background: ${colors.gray20};
`;

const Header = styled.div`
  ${boxStyles.flexColumnCenter}
  margin-bottom: 24px;
  padding-top: 80px;
  gap: 24px;
  background: ${colors.gray20};

  img {
    width: 248px;
    height: 98px;
    flex-shrink: 0;
  }

  button {
    display: inline-flex;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    ${boxStyles.radius8};
    border: 1px solid ${colors.brown40};
    background: ${colors.brown10};
    :hover {
      cursor: pointer;
    }

    img {
      width: 18px;
      height: 18px;
    }

    p {
      color: ${colors.brown40};
      ${fontStyles.caption};
      ${fontStyles.regular};
    }
  }

  @media ${devices.tablet} {
    gap: 0px;
    button {
      position: absolute;
      top: 44px;
      right: 50px;
      padding: 12px 24px;
      gap: 8px;

      p {
        ${fontStyles.body3};
      }
    }

    img {
      width: 456px;
      height: 180px;
      flex-shrink: 0;
    }
  }

  @media ${devices.desktop} {
    button {
      position: absolute;
      top: 45px;
      right: 130px;
    }
  }
`;

const Footer = styled.div`
  width: 100%;
  height: 195px;
  background: ${colors.gray20};
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 239px;
    object-fit: contain;
    object-position: center bottom;
    position: absolute;
    bottom: 0px;
  }

  @media ${devices.tablet} {
    height: 296px;

    img {
      height: 401px;
    }
  }

  @media ${devices.desktop} {
    img {
      height: 627px;
    }
  }
`;

const StyledDiv = styled.div`
  ${boxStyles.flexRowCenter};
  background: ${colors.gray20};
`;

const StyledForm = styled.form`
  display: inline-flex;
  width: 305px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;

  ${boxStyles.radius16};
  background: ${colors.gray10};

  @media ${devices.tablet} {
    width: 400px;
    padding: 32px;
  }
`;

const InputDiv = styled.div`
  width: 100%;
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  align-self: stretch;

  ${boxStyles.radius8};
  border: 1px solid ${colors.gray40};
  background: ${colors.gray10};

  img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  input {
    flex: 1 0 0;
    border: none;
    outline: none;
  }

  &:focus-within {
    border: 1px solid ${colors.brown40};
  }

  ::placeholder {
    color: ${colors.gray40};
    ${fontStyles.body3};
    ${fontStyles.regular};
  }
`;

export default MainPage;
