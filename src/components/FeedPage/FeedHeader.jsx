import { Link } from "react-router-dom";
import * as styled from "../../styles/StyleFeedHeader";
import logoImg from "../../assets/images/logo.svg";
import FeedPageProfile from "../common/FeedPageProfile";

function FeedHeader() {
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
}

export default FeedHeader;
