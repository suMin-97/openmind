import styled from "styled-components";
import BasicFloatingButton from "../../common/BasicFloatingButton";
import { fontStyles, boxStyles, devices } from "@styles/styleVariables";

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
