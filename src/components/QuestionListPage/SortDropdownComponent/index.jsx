import React, { useEffect } from "react";
import styled from "styled-components";
import useDropdown from "../../../hooks/useDropdown";
import DropdownComponent from "../../common/DropdownComponent";
import { colors, fontStyles } from "@styles/styleVariables";
import { useSearchParams } from "react-router-dom";
import up from "@icons/Up.svg";
import down from "@icons/Down.svg";

const SortDropdownComponent = () => {
  // useDropdown hook 선언
  // btnRef : dropdown open/close하기 위한 button의 ref
  // isOpen : dropdown open/close state
  // clickHandler: ref걸려있는 button의 event handler
  const { btnRef, isOpen, clickHandler } = useDropdown();
  const [searchParams, setSearchParams] = useSearchParams();

  // dropdown 영역에 들어갈 option button info
  // name: dropdown option의 이름 (string or ReactNode)
  // event: 해당 option을 클릭했을 때 발생하는 event
  // active(options): 선택된 개체 표출 시 사용 (true일 경우 active-파란색 표시)
  const sortOptions = [
    {
      name: <p style={{ marginRight: "8px" }}>최신순</p>,
      event: () => {
        searchParams.set("sort", "time");
        setSearchParams(searchParams);
      },
      active: searchParams.get("sort") === "time",
    },
    {
      name: <p style={{ marginRight: "8px" }}>이름순</p>,
      event: () => {
        searchParams.set("sort", "name");
        setSearchParams(searchParams);
      },
      active: searchParams.get("sort") === "name",
    },
  ];

  useEffect(() => {
    if (!searchParams.get("sort")) {
      searchParams.set("sort", "time");
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <SortDiv $isOpen={isOpen}>
      <button
        className="sort_button"
        ref={btnRef}
        onClick={() => clickHandler()}
      >
        {(!searchParams.get("sort") || searchParams.get("sort") === "time") &&
          "최신순"}
        {searchParams.get("sort") === "name" && "이름순"}{" "}
        <img src={isOpen ? up : down} />
      </button>
      {isOpen && <DropdownComponent options={sortOptions} />}
    </SortDiv>
  );
};

export default SortDropdownComponent;
const SortDiv = styled.div`
  display: block;
  margin: 12px auto 30px auto;
  width: fit-content;
  .sort_button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border-radius: 8px;
    border: 1px solid
      ${(props) => (props.$isOpen ? colors.gray60 : colors.gray40)};
    color: ${(props) => (props.$isOpen ? colors.gray60 : colors.gray40)};
    background: ${colors.gray10};
    padding: 8px 12px;
    width: 81px;
    height: 36px;
    ${fontStyles.medium};
    ${fontStyles.caption};
    img {
      width: 14px;
      height: 14px;
      color: ${(props) => (props.$isOpen ? colors.gray60 : colors.gray40)};
    }
  }
`;
