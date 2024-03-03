import { Link } from "react-router-dom";
import Modalsection from "../../components/FeedPage/ModalSection";
import FeedPageProfile from "../../components/FeedPage/FeedPageProfile";
import ShareButtons from "../../components/common/ShareButtons";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router-dom";
import FeedCardList from "../../components/common/FeedCardList.jsx/index.jsx";

const FeedPage = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <Link to="/">메인 페이지</Link>
      <Link to="/list">리스트 페이지</Link>
      <Link to={`/post/${id}/answer`}>답변 페이지</Link>
      <FeedPageProfile subjectId={id} />
      <ShareButtons id={id} />
      <FeedCardList subjectId={id} />
      <Modalsection
        subjectId={id}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
};

export default FeedPage;
