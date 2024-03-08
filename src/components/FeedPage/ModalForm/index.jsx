import { useState } from "react";
import styled from "styled-components";
import SubmitButton from "../../common/SubmitButton";
import useRequest from "../../../hooks/useRequest";
import { useEffect } from "react";
import BASIC_QUESTION from "./constant";
import {
  colors,
  boxStyles,
  fontStyles,
  devices,
} from "../../../styles/styleVariables";

const BasicModalForm = ({
  className,
  subjectId,
  setIsModalOpen,
  handleQuestionSubmit,
}) => {
  const {
    data: profileData,
    error: profileError,
    isLoading: profileIsLoading,
    request: getRequest,
  } = useRequest({
    url: `subjects/${subjectId}`,
    method: "GET",
  });
  // const { request: postRequest } = useRequest({
  //   url: `subjects/${subjectId}/questions`,
  //   method: "POST",
  // });
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState("");
  const regex = /^[\s\S]*\S[\s\S]*$/; // 스페이스,엔터만 입력한 경우 같이 값은 있지만 사실상 내용이 없는 공란을 검사하는 정규식, false이면 공란임

  // const questionFormValidation = (value) => {
  //   BASIC_QUESTION.subjectId = subjectId;
  //   BASIC_QUESTION.content = value;
  //   postRequest(BASIC_QUESTION);
  // };

  const onQuestionSubmit = (event) => {
    event.preventDefault();
    if (regex.test(value)) {
      handleQuestionSubmit(value);
      setValue("");
      setIsModalOpen(false);
    }
  };

  const handleEnterKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (regex.test(event.target.value)) {
        handleSubmit(value);
        setValue("");
        setIsModalOpen(false);
      }
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    if (regex.test(event.target.value)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    getRequest();
  }, []);

  return (
    <form onSubmit={onQuestionSubmit} className={className}>
      <label htmlFor="question">
        {profileIsLoading && (
          <ProfileDiv>
            <P>To.</P>
            <p>로딩중</p>
          </ProfileDiv>
        )}
        {profileData && (
          <ProfileDiv>
            <P>To.</P>
            <img src={profileData?.imageSource} draggable="false" />
            <p>{profileData?.name}</p>
          </ProfileDiv>
        )}
        {profileError && (
          <ProfileDiv>
            <P>To.</P>
            <p>삐빅 에러입니다</p>
          </ProfileDiv>
        )}
      </label>
      <textarea
        id="question"
        onChange={handleChange}
        onKeyDown={handleEnterKeyDown}
        value={value}
        name="content"
        placeholder="질문을 입력해주세요"
      />
      <SubmitButton type="submit" isDisabled={isDisabled}>
        {"질문 보내기"}
      </SubmitButton>
    </form>
  );
};

const ModalForm = styled(BasicModalForm)`
  ${boxStyles.flexColumnCenter};
  align-items: start;
  gap: 0.5rem;

  & textarea {
    ${boxStyles.flexRowCenter};
    ${boxStyles.paddingInput};
    outline: none;
    border: none;
    resize: none;
    background-color: ${colors.gray20};
    font-family: "Pretendard";
    color: ${colors.gray60};
    ${fontStyles.body3};
    ${fontStyles.regular};
    ${boxStyles.radius8};
    width: 100%;
    height: 358px;

    &::placeholder {
      color: ${colors.gray40};
    }

    &:focus {
      border: 1px solid ${colors.brown40};
    }

    @media ${devices.tablet} {
      height: 180px;
    }
  }
`;

const ProfileDiv = styled.div`
  height: 28px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;

  color: ${colors.gray60};
  ${fontStyles.regular};
  ${fontStyles.body3};

  img {
    width: 28px;
    height: 28px;
    ${boxStyles.radius200};
  }
`;

const P = styled.p`
  color: ${colors.gray60};
  ${fontStyles.regular};
  ${fontStyles.body2};
`;

export default ModalForm;
