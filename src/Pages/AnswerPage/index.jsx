import { Link } from "react-router-dom";
import Badge from "../../components/common/Badge";
import Reaction from "../../components/common/Reaction";
import FeedContainer from "../../components/common/FeedContainer";
import BasicFloatingButton from "../../components/common/BasicFloatingButton";
import DeleteFloatingButton from "../../components/AnswerPage/DeleteFloatingButton";
import useRequest from "../../hooks/useRequest";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AnswerPage = () => {
  const navigate = useNavigate();
  // const { id } = useParams();
  const { id } = useParams();

  const {
    data,
    error,
    isLoading,
    request: useFeedDelete,
  } = useRequest({
    method: "DELETE",
    url: `subjects/${id}`,
  });

  const handleFeedDelete = async () => {
    const remove = window.confirm("피드를 삭제할까요?");
    if (remove) {
      await useFeedDelete();
    }
  };

  return (
    <div>
      <h1>답변 페이지</h1>
      <Link to="/">메인 페이지</Link>
      <Link to="/list">리스트 페이지</Link>
      <Link to="/post/1">피드 페이지</Link>
      <Badge isAnswered>가나다</Badge>
      <Badge>가나다</Badge>
      <Reaction />
      <FeedContainer />
      <BasicFloatingButton disabled>제출하기</BasicFloatingButton>
      <BasicFloatingButton>제출하기</BasicFloatingButton>
      <DeleteFloatingButton handleDelete={handleFeedDelete} />
    </div>
  );
};

export default AnswerPage;
