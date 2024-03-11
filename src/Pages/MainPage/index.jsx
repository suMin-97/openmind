import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "@hooks/useRequest";
import { BASIC_SUBJECT, POST_URL } from "./constants";
import MainLayout from "../../components/MainPage/MainLayOut";
import MainPageHeader from "../../components/MainPage/MainPageHeader";
import MainForm from "../../components/MainPage/MainForm";

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

  const navigateQuestionPage = () => {
    navigate("list");
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
        if (
          confirm(
            "기존에 생성한 피드가 존재합니다. 새로운 피드를 생성하시겠습니까?\n새로운 피드를 생성하면 기존 피드를 이용하실 수 없습니다."
          )
        ) {
          BASIC_SUBJECT.name = event.target.value;
          const newSubject = { ...BASIC_SUBJECT };
          postSubjectRequest(newSubject);
        } else {
          navigateAnswerPage(localStorage.getItem("id"));
        }
      } else {
        handleToast();
      }
    }
  };

  const handleSubmitClick = (event) => {
    event.preventDefault();
    if (emptyCheckRegex.test(value) && isLengthCheckRegex) {
      if (
        confirm(
          "기존에 생성한 피드가 존재합니다. 새로운 피드를 생성하시겠습니까?\n새로운 피드를 생성하면 기존 피드를 이용하실 수 없습니다."
        )
      ) {
        BASIC_SUBJECT.name = value;
        const newSubject = { ...BASIC_SUBJECT };
        postSubjectRequest(newSubject);
      } else {
        navigateAnswerPage(localStorage.getItem("id"));
      }
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
  }, [isLoading]);

  return (
    <MainLayout isOpenToast={isOpenToast}>
      <MainPageHeader navigateQuestionPage={navigateQuestionPage} />
      <MainForm
        handleSubmitClick={handleSubmitClick}
        handleChange={handleChange}
        isEmptyValue={isEmptyValue}
      />
    </MainLayout>
  );
};

export default MainPage;
