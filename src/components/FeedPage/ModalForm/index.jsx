import { useState } from "react";
import styled from "styled-components";
import boxStyles from "@styles/boxStyles";
import colors from "@styles/colors";
import fontStyles from "@styles/fontStyles";
import SubmitButton from "../../common/SubmitButton";
import useRequest from "../../../hooks/useRequest";
import { useEffect } from "react";
import BASIC_QUESTION from "./constant";

const BasicModalForm = ({ className, subjectId, setIsModalOpen }) => {
  const {
    data: profileData,
    error: profileError,
    isLoading: profileIsLoading,
    request: getRequest,
  } = useRequest({
    url: `subjects/${subjectId}`,
    method: "GET",
  });
  const { request: postRequest } = useRequest({
    url: `subjects/${subjectId}/questions`,
    method: "POST",
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState("");
  const regex = /^.*\S.*$/; // 스페이스,엔터만 입력한 경우 같이 값은 있지만 사실상 내용이 없는 공란을 검사하는 정규식, false이면 공란임

  const handleSubmit = (value) => {
    BASIC_QUESTION.subjectId = subjectId;
    BASIC_QUESTION.content = value;
    postRequest(BASIC_QUESTION);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (regex.test(value)) {
      handleSubmit(value);
      setValue("");
      setIsModalOpen(false);
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value);
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
    <form onSubmit={onFormSubmit} className={className}>
      <label htmlFor="question">
        {profileIsLoading && <p>로딩중</p>}
        {profileData && (
          <>
            <img src={profileData?.imageSource} />
            <p>{profileData?.name}</p>
          </>
        )}
        {profileError && <p>삐빅 에러 입니다</p>}
      </label>
      <input
        id="question"
        onChange={handleChange}
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
  gap: 0.5rem;

  & input {
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

    &::placeholder {
      color: ${colors.gray40};
    }

    &:focus {
      border: 1px solid ${colors.brown40};
    }
  }
`;

export default ModalForm;
