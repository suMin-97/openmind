import DropdownComponent from "../../common/DropdownComponent";
import useDropdown from "../../../hooks/useDropdown";
import { ReactComponent as MoreIcon } from "@icons/More.svg";
import { ReactComponent as EditIcon } from "@icons/Edit.svg";
import { ReactComponent as DeleteIcon } from "@icons/Close.svg";
import { ReactComponent as RejectionIcon } from "@icons/Rejection.svg";
import IconTextButton from "../../common/IconTextButton";
import styled from "styled-components";
import useRequest from "@hooks/useRequest";
import { useEffect } from "react";
import useDelete from "./useDelete";

const BasicMoreDropdown = ({
  className,
  questionId,
  isAnswered,
  answerId,
  setIsModify,
  setAnswerContent,
}) => {
  const { btnRef, isOpen, clickHandler } = useDropdown();

  const { isRejected } = isAnswered ?? {};

  const { data: rejectResponse, request: useRejectAnswer } = useRequest({
    url: `questions/${questionId}/answers`,
    method: "POST",
  });

  const { data: deleteResponse, request: useDeleteAnswer } = useDelete({
    url: `answers/${answerId}`,
  });

  const moreDeleteOptions = [
    {
      name: (
        <IconTextButton
          imageSource={<DeleteIcon width="16" height="16" />}
          text="삭제하기"
        />
      ),
      event: () => {
        useDeleteAnswer();
      },
      active: false,
    },
  ];

  const moreEditableOptions = [
    {
      name: (
        <IconTextButton
          imageSource={<EditIcon width="16" height="16" />}
          text="수정하기"
        />
      ),
      event: () => {
        setIsModify((prevState) => !prevState);
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
      event: () => {
        useDeleteAnswer();
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
      event: () => {
        useRejectAnswer({ content: "string", isRejected: true });
      },
      active: false,
    },
  ];

  useEffect(() => {
    const status = deleteResponse?.status;
    if (status >= 200 && status < 300) {
      setAnswerContent(null);
    }
  }, [deleteResponse]);

  useEffect(() => {
    if (rejectResponse) {
      setAnswerContent(rejectResponse);
    }
  }, [rejectResponse]);

  return (
    <div className={className}>
      <button ref={btnRef} onClick={clickHandler}>
        <MoreIcon width="26" height="26" />
      </button>
      {isOpen && (
        <DropdownComponent
          options={
            isAnswered
              ? isRejected
                ? moreDeleteOptions
                : moreEditableOptions
              : moreDefaultOptions
          }
        />
      )}
    </div>
  );
};

const MoreDropdown = styled(BasicMoreDropdown)`
  width: 26px;
  height: 26px;
  & button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

export default MoreDropdown;
