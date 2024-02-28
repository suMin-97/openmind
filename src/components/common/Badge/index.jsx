import styled from "styled-components";
import { colors, fontStyles, boxStyles } from "@styles/styleVariables";

const BasicBadge = ({ className, isAnswered }) => {
  return (
    <span className={className} isAnswered>
      {isAnswered ? "답변 완료" : "미답변"}
    </span>
  );
};

const Badge = styled(BasicBadge)`
  ${boxStyles.inlineFlexRowCenter};
  ${boxStyles.paddingBadge};
  ${boxStyles.radius8};
  ${fontStyles.caption};
  ${fontStyles.medium};
  color: ${(props) => (props.isAnswered ? colors.brown40 : colors.gray40)};
  border: 1px solid
    ${(props) => (props.isAnswered ? colors.brown40 : colors.gray40)};
`;

export default Badge;
