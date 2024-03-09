import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRequest from "@hooks/useRequest";
import useDelete from "@components/AnswerPage/MoreDropdown/useDelete";
import FeedLayout from "@layout/FeedLayout";
import FeedContainer from "@components/common/FeedContainer";
import DeleteFloatingButton from "@components/AnswerPage/DeleteFloatingButton";

const AnswerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: feedCardData,
    isLoading,
    error,
    request: getFeedCardData,
  } = useRequest({ method: "GET", url: `subjects/${id}/questions` });

  const { data: FeedDeleteResponse, request: useFeedDelete } = useDelete({
    url: `subjects/${id}`,
  });

  const handleFeedDelete = () => {
    const remove = window.confirm("피드를 삭제할까요?");
    if (remove) {
      useFeedDelete();
    }
  };

  useEffect(() => {
    getFeedCardData();
  }, []);

  const { count, results: feedCardList } = feedCardData ?? {};

  useEffect(() => {
    const status = FeedDeleteResponse?.status;
    if (status && status >= 200 && status < 300) {
      localStorage.removeItem("id");
      navigate("/");
    }
  }, [FeedDeleteResponse]);

  return (
    <FeedLayout id={id} $feedType="answer">
      <DeleteFloatingButton handleDelete={handleFeedDelete} />
      <FeedContainer
        subjectId={id}
        cardType="answerFeed"
        feedCardList={feedCardList}
        count={count}
        isLoading={isLoading}
        error={error}
      />
    </FeedLayout>
  );
};

export default AnswerPage;
