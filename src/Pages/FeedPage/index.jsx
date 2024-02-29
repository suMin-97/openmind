import { Link } from "react-router-dom";
import FeedPageProfile from "./FeedPageProfile";

const FeedPage = () => {
  return (
    <div>
      <FeedPageProfile />
      <Link to="/">메인 페이지</Link>
      <Link to="/list">리스트 페이지</Link>
      <Link to="/post/1/answer">답변 페이지</Link>
    </div>
  );
};

export default FeedPage;
