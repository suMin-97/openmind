import { Link } from "react-router-dom";
import Badge from "../../components/common/Badge";

const AnswerPage = () => {
  return (
    <div>
      <h1>답변 페이지</h1>
      <Link to="/">메인 페이지</Link>
      <Link to="/list">리스트 페이지</Link>
      <Link to="/post/1">피드 페이지</Link>
      <Badge isAnswered>가나다</Badge>
      <Badge>가나다</Badge>
    </div>
  );
};

export default AnswerPage;
