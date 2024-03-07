import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useDelete from "@components/AnswerPage/MoreDropdown/useDelete";
import FeedLayout from "@layout/FeedLayout";
import FeedContainer from "@components/common/FeedContainer";
import DeleteFloatingButton from "@components/AnswerPage/DeleteFloatingButton";

const AnswerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: FeedDeleteResponse,
    error,
    isLoading,
    request: useFeedDelete,
  } = useDelete({
    url: `subjects/${id}`,
  });

  const handleFeedDelete = () => {
    const remove = window.confirm("피드를 삭제할까요?");
    if (remove) {
      useFeedDelete();
    }
  };

  useEffect(() => {
    const status = FeedDeleteResponse?.status;
    if (status && status >= 200 && status < 300) {
      navigate("/");
    }
    // 로컬스토리지에 저장되어있던 Id 생성 정보를 삭제하는 로직 추가 필요
  }, [FeedDeleteResponse]);

  return (
    <FeedLayout id={id} feedType="answer">
      <DeleteFloatingButton handleDelete={handleFeedDelete} />
      <FeedContainer subjectId={id} cardType="answerFeed" />
    </FeedLayout>
  );
};

export default AnswerPage;
