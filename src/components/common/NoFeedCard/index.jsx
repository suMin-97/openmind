import styled from "styled-components";
import { ReactComponent as NoMessageIcon } from "@icons/No-message.svg";
import { devices, boxStyles } from "@styles/styleVariables";

const BasicNoFeedCard = ({ className }) => {
  return (
    <div className={className}>
      <NoMessageIcon width="114" height="118" viewBox="0 0 176 180" />
    </div>
  );
};

const NoFeedCard = styled(BasicNoFeedCard)`
  ${boxStyles.flexRowCenter};
  flex-grow: 1;
  padding-bottom: 2rem;

  @media ${devices.tablet} {
    & svg {
      width: 150px;
      height: 154px;
    }
  }
`;

export default NoFeedCard;
