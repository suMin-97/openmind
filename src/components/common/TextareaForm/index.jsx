import { useState } from "react";
import styled from "styled-components";
import { inputText } from "./constant";
import { boxStyles, colors, fontStyles } from "@styles/styleVariables";
import SubmitButton from "../SubmitButton";
import { useEffect } from "react";

const BasicTextareaForm = ({
  className,
  formType,
  handleSubmit,
  id,
  prevValue,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [value, setValue] = useState("");
  const regex = /^[\s\S]*\S[\s\S]*$/; // 스페이스,엔터만 입력한 경우 같이 값은 있지만 사실상 내용이 없는 공란을 검사하는 정규식, false이면 공란임

  const handleChange = ({ target }) => {
    setValue(target.value);
    if (regex.test(target.value)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(value);
    console.log(value);
    setValue("");
  };

  useEffect(() => {
    if (prevValue) {
      setValue(prevValue);
    }
  }, [prevValue]);

  return (
    <form onSubmit={onFormSubmit} className={className} name="content">
      <textarea
        onChange={handleChange}
        value={value}
        name="content"
        placeholder={inputText[formType]?.placeholder}
      ></textarea>
      <SubmitButton isDisabled={isDisabled}>
        {inputText[formType]?.button}
      </SubmitButton>
    </form>
  );
};

const TextareaForm = styled(BasicTextareaForm)`
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

export default TextareaForm;
