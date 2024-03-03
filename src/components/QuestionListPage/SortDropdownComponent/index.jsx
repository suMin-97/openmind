import React from "react";
import styled from "styled-components";
import useDropdown from "../../../hooks/useDropdown";
import DropdownComponent from "../../common/DropdownComponent";
import { colors, fontStyles } from "@styles/styleVariables";

const SortDropdownComponent = () => {
  // useDropdown hook 선언
  // btnRef : dropdown open/close하기 위한 button의 ref
  // isOpen : dropdown open/close state
  // clickHandler: ref걸려있는 button의 event handler
  const { btnRef, isOpen, clickHandler } = useDropdown();

  // dropdown 영역에 들어갈 option button info
  // name: dropdown option의 이름 (string or ReactNode)
  // event: 해당 option을 클릭했을 때 발생하는 event
  // active(options): 선택된 개체 표출 시 사용 (true일 경우 active-파란색 표시)
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
