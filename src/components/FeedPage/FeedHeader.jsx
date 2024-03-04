import { Link } from "react-router-dom";
import * as styled from "./StyleFeedHeader";
import logoImg from "../../assets/images/logo.svg";
import FeedPageProfile from "../common/FeedPageProfile";

const FeedHeader = () => {
  return (
    <>
      <styled.Header>
        <styled.Container>
          <Link to={"/"}>
            <styled.Logo src={logoImg} />
          </Link>
          <FeedPageProfile />
        </styled.Container>
      </styled.Header>
    </>
  );
};

export default FeedHeader;
