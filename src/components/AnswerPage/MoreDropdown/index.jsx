import DropdownComponent from "../../common/DropdownComponent";
import useDropdown from "../../../hooks/useDropdown";
import { ReactComponent as MoreIcon } from "@icons/More.svg";
import { ReactComponent as EditIcon } from "@icons/Edit.svg";
import { ReactComponent as DeleteIcon } from "@icons/Close.svg";
import { ReactComponent as RejectionIcon } from "@icons/Rejection.svg";
import IconTextButton from "../../common/IconTextButton";
import styled from "styled-components";

const BasicMoreDropdown = ({ className, id, isAnswered, answerId }) => {
  const { btnRef, isOpen, clickHandler } = useDropdown();

  const moreEditableOptions = [
    {
      name: (
        <IconTextButton
          imageSource={<EditIcon width="16" height="16" />}
          text="수정하기"
        />
      ),
      event: (e) => {
        console.log("수정하기");
      },
      active: false,
    },
    {
      name: (
        <IconTextButton
          imageSource={<DeleteIcon width="16" height="16" />}
          text="삭제하기"
        />
      ),
      event: (e) => {
        console.log("삭제하기");
      },
      active: false,
    },
  ];

  const moreDefaultOptions = [
    {
      name: (
        <IconTextButton
          imageSource={<RejectionIcon width="16" height="16" />}
          text="거절하기"
        />
      ),
      event: (e) => {
        console.log("답변 거절");
      },
      active: false,
    },
  ];

  return (
    <div className={className}>
      <button ref={btnRef} onClick={clickHandler}>
        <MoreIcon width="26" height="26" />
      </button>
      {isOpen && (
        <DropdownComponent
          options={isAnswered ? moreEditableOptions : moreDefaultOptions}
        />
      )}
    </div>
  );
};

const MoreDropdown = styled(BasicMoreDropdown)`
  & button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export default MoreDropdown;
