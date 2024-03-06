import { Link } from "react-router-dom";
import SubmitButton from "../../components/common/SubmitButton";
import logo from "../../assets/images/logo.svg";
import backgroundImg from "../../assets/images/background-image.png";
import useRequest from "../../hooks/useRequest";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BASIC_SUBJECT, POST_URL } from "./constants";
import { useState } from "react";

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
    <div>
      <div>
        <img src={logo} />
        <Link to="/list">
          <button>질문하러 가기</button>
        </Link>
      </div>
      <div>
        <form onSubmit={handleSubmitClick}>
          <input onChange={handleChange} />
          <SubmitButton>질문 받기</SubmitButton>
        </form>
      </div>
      <div>
        <img src={backgroundImg} />
      </div>
    </div>
  );
};

export default MainPage;
