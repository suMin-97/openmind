import React from "react";
import styled from "styled-components";
import useDropdown from "../../../hooks/useDropdown";
import DropdownComponent from "../../common/DropdownComponent";
import { colors, fontStyles } from "@styles/styleVariables";

const SortDropdownComponent = () => {
  const { btnRef, isOpen, clickHandler } = useDropdown();

  const sortOptions = [
    {
      name: "최신순",
      event: (e) => {
        console.log("최신순");
      },
      active: true,
    },
    {
      name: "이름순",
      event: (e) => {
        console.log("이름순");
      },
      active: false,
    },
  ];

  return (
    <>
      <SortButton ref={btnRef} onClick={() => clickHandler()}>
        최신순
      </SortButton>
      {isOpen && <DropdownComponent options={sortOptions} />}
    </>
  );
};

export default SortDropdownComponent;

const SortButton = styled.button`
  border-radius: 8px;
  border: 1px solid ${colors.gray60};
  background: ${colors.gray10};
  padding: 8px 12px;
  width: 79px;
  height: 34px;
  color: ${colors.gray60};
  ${fontStyles.medium};
  ${fontStyles.caption};
`;
