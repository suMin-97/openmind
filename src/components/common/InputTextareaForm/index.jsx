import { useState } from "react";
import styled from "styled-components";
import { inputText } from "./constant";
import { boxStyles, colors, fontStyles } from "@styles/styleVariables";
import SubmitButton from "../SubmitButton";

const BasicInputTextareaForm = ({ className, formType, handleSubmit, id }) => {
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
    handleSubmit(value);
    console.log(value);
    setValue("");
  };

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
