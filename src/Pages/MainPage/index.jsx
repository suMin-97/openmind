import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors, boxStyles, fontStyles, devices } from "@styles/styleVariables";
import useRequest from "@hooks/useRequest";
import logo from "@images/logo.svg";
import backgroundImg from "@images/background-image.png";
import personIcon from "@icons/Person.svg";
import arrowRightBrown from "@icons/arrow-right-brown.svg";
import SubmitButton from "@components/common/SubmitButton";
import { BASIC_SUBJECT, POST_URL } from "./constants";
import Toast from "../../components/common/Toast";

const MainPage = () => {
  const [value, setValue] = useState("");
  const [isOpenToast, setIsOpenToast] = useState(false);
  const emptyCheckRegex = /^[\s\S]*\S[\s\S]*$/; // 스페이스,엔터만 입력한 경우 같이 값은 있지만 사실상 내용이 없는 공란을 검사하는 정규식, false이면 공란임
  const lengthCheckRegex = /^[a-zA-Z가-힣0-9\s]{2,8}$/;
  const isEmptyValue = emptyCheckRegex.test(value);
  const isLengthCheckRegex = lengthCheckRegex.test(value);
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

  const navigateFeedPage = (id) => {
    navigate(`/post/${id}`);
  };

  const handleToast = () => {
    setIsOpenToast(true);
    setTimeout(() => {
      setIsOpenToast(false);
    }, 2000);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.key === "Enter") {
      event.preventDefault();
      if (emptyCheckRegex.test(event.target.value) && isLengthCheckRegex) {
        BASIC_SUBJECT.name = event.target.value;
        const newSubject = { ...BASIC_SUBJECT };
        postSubjectRequest(newSubject);
      } else {
        handleToast();
      }
    }
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    if (emptyCheckRegex.test(value) && isLengthCheckRegex) {
      BASIC_SUBJECT.name = value;
      const newSubject = { ...BASIC_SUBJECT };
      postSubjectRequest(newSubject);
    } else {
      handleToast();
    }
  };

  useEffect(() => {
    if (data?.id) {
      navigateAnswerPage(data?.id);
      localStorage.setItem("id", data?.id);
    } else if (error) {
      alert("다시 시도해주세요"); // 에러처리 정해야함
    }

    if (localStorage.getItem("id")) {
      setTimeout(() => {
        confirm(
          "이전에 가입한 이력이 있습니다. 해당 피드 페이지로 이동하시겠습니까?"
        )
          ? navigateFeedPage(localStorage.getItem("id"))
          : null;
      }, 1000);
    }
  }, [isLoading]);

  return (
    <ContainDiv>
      <Container>
        <Header>
          <img src={logo} draggable="false" />
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
                <img draggable="false" src={personIcon} />
              </label>
              <input
                id="name"
                placeholder="이름을 입력하세요"
                onChange={handleChange}
              />
            </InputDiv>
            {isEmptyValue ? (
              <SubmitButton>질문 받기</SubmitButton>
            ) : (
              <DisabledButton htmlFor="name">질문 받기</DisabledButton>
            )}
          </StyledForm>
        </StyledDiv>
      </Container>
      {isOpenToast && <Toast>2-8 글자 내 작성해주세요</Toast>}
    </ContainDiv>
  );
};

const ContainDiv = styled.div`
  background: ${colors.gray20};
  width: 100%;
  height: 100vh;
  ${boxStyles.flexColumnCenter};
`;

const Container = styled.div`
  background-image: url(${backgroundImg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
  width: 100%;
  height: 100vh;
  ${boxStyles.flexColumnCenter};
  justify-content: center;
  @media ${devices.desktop} {
    max-width: 1200px;
  }
`;

const Header = styled.div`
  ${boxStyles.flexColumnCenter}
  margin-bottom: 24px;
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

const StyledDiv = styled.div`
  ${boxStyles.flexRowCenter};
  padding-bottom: 64px;

  @media ${devices.tablet} {
    padding-bottom: 100px;
  }
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

  label {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  input {
    flex: 1 0 0;
    border: none;
    outline: none;

    ${fontStyles.body3};
    ${fontStyles.regular};
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

const DisabledButton = styled.label`
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

export default MainPage;
