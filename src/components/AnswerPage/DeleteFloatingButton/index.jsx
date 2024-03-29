import styled from "styled-components";
import { fontStyles, boxStyles, devices } from "@styles/styleVariables";
import BasicFloatingButton from "@components/common/BasicFloatingButton";

const BasicDeleteFloatingButton = ({ className, handleDelete }) => {
  return (
    <BasicFloatingButton className={className} handleClick={handleDelete}>
      삭제하기
    </BasicFloatingButton>
  );
};

const DeleteFloatingButton = styled(BasicDeleteFloatingButton)`
  ${boxStyles.paddingButtonS};
  ${boxStyles.inlineFlexRowCenter};
  align-self: flex-end;
  ${fontStyles.deleteS};
  width: 70px;
  height: 25px;

  @media ${devices.tablet} {
    ${boxStyles.paddingButtonM};
    ${fontStyles.deleteM};
    width: 100px;
    height: 35px;
  }
`;

export default DeleteFloatingButton;
