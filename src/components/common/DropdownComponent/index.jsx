import styled from "styled-components";
import { colors, fontStyles } from "@styles/styleVariables";

// type : "select" | "sort"
const DropdownComponent = ({ options, type = "select" }) => {
  return (
    <DropdownSort type={type}>
      <DropdownAbsolute type={type}>
        {options?.map((option, i) => {
          return (
            <DButton
              key={option.name + i}
              onClick={(e) => option.event(e)}
              $active={(option?.active ?? false) + ""}
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
  width: ${(props) => (props.type === "select" ? "105px" : "81px")};
`;

const DropdownAbsolute = styled.div`
  position: absolute;
  bottom: ${(props) => (props.type === "select" ? "-30px" : "-72px")};
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
  padding: 4px 0;
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
  color: ${(props) => (props.$active === "true" ? colors.blue : colors.gray50)};
  ${fontStyles.medium};
  ${fontStyles.caption};
  &:hover {
    background-color: ${colors.gray20};
    color: ${(props) =>
      props.$active === "true" ? colors.blue : colors.gray60};
  }
`;
