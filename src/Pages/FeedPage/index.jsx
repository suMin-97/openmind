import { Link } from "react-router-dom";
import Modalsection from "../../components/PostPage/ModalSection";
import FeedPageProfile from "./FeedPageProfile";
import ShareButtons from "../../components/common/ShareButtons";
import { useLocation } from "react-router-dom";
import { BASIC_DEPLOY_URL } from "../../constants/constants";

const FeedPage = () => {
  const currentLocation = useLocation();
  const currentPath = currentLocation.pathname;
  const currentUrl = `${BASIC_DEPLOY_URL}${currentPath}`;

  return (
    <div>
      <FeedPageProfile />
      <Link to="/">메인 페이지</Link>
      <Link to="/list">리스트 페이지</Link>
      <Link to="/post/1/answer">답변 페이지</Link>
      <ShareButtons url={currentUrl} />
      <Modalsection />
    </div>
  );
};

export default FeedPage;
