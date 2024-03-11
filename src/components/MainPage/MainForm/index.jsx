import styled from "styled-components";
import { colors, boxStyles, fontStyles, devices } from "@styles/styleVariables";
import personIcon from "@icons/Person.svg";
import DisabledButton from "@components/common/DisabledButton";
import SubmitButton from "@components/common/SubmitButton";

const MainForm = ({ isEmptyValue, handleChange, handleSubmitClick }) => {
  return (
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
          <DisabledButton id="name">질문 받기</DisabledButton>
        )}
      </StyledForm>
    </StyledDiv>
  );
};

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

export default MainForm;
