import { Link } from "react-router-dom";

const FeedPage = () => {
  return (
    <div>
      <h1>개인 피드 페이지</h1>
      <Link to="/">메인 페이지</Link>
      <Link to="/list">리스트 페이지</Link>
      <Link to="/post/1/answer">답변 페이지</Link>
    </div>
  );
};

export default FeedPage;
