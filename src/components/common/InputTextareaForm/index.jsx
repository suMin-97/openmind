import { useState } from "react";
import { inputText } from "./constant";
import styled from "styled-components";
import boxStyles from "@styles/boxStyles";
import colors from "@styles/colors";
import fontStyles from "@styles/fontStyles";
import SubmitButton from "../SubmitButton";

const BasicInputTextareaForm = ({ className, formType, handleSubmit }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState("");

  const handleChange = ({ target }) => {
    setValue(target.value);
    if (target.value.length === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    // handleSubmit();
    // 부모 컴포넌트에서 받아온 handleSubmit prop을 통해 리퀘스트 제어
    // console.log는 나중에 삭제해주세요!
    console.log(value);
    setValue("");
  };

  return (
    <form onSubmit={onFormSubmit} className={className}>
      <textarea
        onChange={handleChange}
        value={value}
        name="content"
        placeholder={inputText[formType]?.placehodler}
      ></textarea>
      <SubmitButton isDisabled={isDisabled}>
        {inputText[formType]?.button}
      </SubmitButton>
    </form>
  );
};

const InputTextareaForm = styled(BasicInputTextareaForm)`
  ${boxStyles.flexColumnCenter};
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

    &::placeholder {
      color: ${colors.gray40};
    }

    &:focus {
      border: 1px solid ${colors.brown40};
    }
  }
`;

export default InputTextareaForm;
