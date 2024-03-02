import { Link } from "react-router-dom";
import Modalsection from "../../components/FeedPage/ModalSection";
import FeedPageProfile from "../../components/FeedPage/FeedPageProfile";
import ShareButtons from "../../components/common/ShareButtons";
import { useLocation } from "react-router-dom";
import { BASIC_DEPLOY_URL } from "../../constants/constants";
import { useSearchParams } from "react-router-dom";

const FeedPage = ({ subjectId = 3859 }) => {
  const currentLocation = useLocation();
  const currentPath = currentLocation.pathname;
  const currentUrl = `${BASIC_DEPLOY_URL}${currentPath}`;
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <FeedPageProfile subjectId={subjectId} />
      <Link to="/">메인 페이지</Link>
      <Link to="/list">리스트 페이지</Link>
      <Link to="/post/1/answer">답변 페이지</Link>
      <ShareButtons url={currentUrl} />
      <Modalsection
        subjectId={subjectId}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

export default FeedPage;
