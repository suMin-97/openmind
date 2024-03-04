import { Link } from "react-router-dom";
import Modalsection from "../../components/FeedPage/ModalSection";
import ShareButtons from "../../components/common/ShareButtons";
import { useParams } from "react-router-dom";
import FeedCardList from "../../components/common/FeedCardList";
import FeedHeader from "../../components/FeedPage/FeedHeader.jsx";

const FeedPage = () => {
  const { id } = useParams();

  return (
    <div>
      <Link to="/">메인 페이지</Link>
      <Link to="/list">리스트 페이지</Link>
      <Link to={`/post/${id}/answer`}>답변 페이지</Link>
      <FeedHeader />
      <ShareButtons id={id} />
      <FeedCardList subjectId={id} />
      <Modalsection subjectId={id} />
    </div>
  );
};

export default FeedPage;
