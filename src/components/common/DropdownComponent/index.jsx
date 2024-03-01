import styled from "styled-components";
import { colors, fontStyles } from "@styles/styleVariables";

const DropdownComponent = ({ options }) => {
  return (
    <DropdownSort>
      <DropdownAbsolute>
        {options?.map((option, i) => {
          return (
            <DButton
              key={option.name + i}
              onClick={(e) => option.event(e)}
              $active={option.active + ""}
            >
              {option.name}
            </DButton>
          );
        })}
      </DropdownAbsolute>
    </DropdownSort>
  );
};

export default DropdownComponent;

const DropdownSort = styled.div`
  position: relative;
`;

const DropdownAbsolute = styled.div`
  position: absolute;
  bottom: -67px;
  left: 0;
  background-color: ${colors.gray10};
  border-radius: 8px;
  border: 1px solid ${colors.gray30};
  background: ${colors.gray10};
  /* 1pt */
  box-shadow: 0px 4px 4px 0px rgba(140, 140, 140, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;
const DButton = styled.button`
  display: flex;
  padding: 6px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  background-color: transparent;
  border: none;
  color: ${(props) => (props.$active === "true" ? "#1877F2" : "#515151")};
  ${fontStyles.medium};
  ${fontStyles.caption};
`;
