import { Link } from "react-router-dom";
import Modalsection from "../../components/PostPage/ModalSection";
import FeedPageProfile from "./FeedPageProfile";
import ShareButtons from "../../components/common/ShareButton/ShareButtons";
import { useLocation } from "react-router-dom";

const FeedPage = () => {
  const currentLocation = useLocation();
  const currentPath = currentLocation.pathname;

  return (
    <div>
      <FeedPageProfile />
      <Link to="/">메인 페이지</Link>
      <Link to="/list">리스트 페이지</Link>
      <Link to="/post/1/answer">답변 페이지</Link>
      <ShareButtons path={currentPath} />
      <Modalsection />
    </div>
  );
};

export default FeedPage;
