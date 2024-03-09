import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import useRequestWithoutSlash from "@hooks/useRequestWithoutSlash";
import useDelete from "@components/AnswerPage/MoreDropdown/useDelete";
import FeedLayout from "@layout/FeedLayout";
import FeedContainer from "@components/common/FeedContainer";
import DeleteFloatingButton from "@components/AnswerPage/DeleteFloatingButton";

const AnswerPage = () => {
  const [page, setPage] = useState(1);
  const [feedDataList, setFeedDataList] = useState([]);
  const target = useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  const [observe, unobserve] = useIntersectionObserver(() => {
    setPage((prevPage) => prevPage + 1);
  });

  const {
    data: feedCardData,
    isLoading,
    error,
    request: getFeedCardData,
  } = useRequestWithoutSlash({
    method: "GET",
    url: `subjects/${id}/questions/?limit=8&offset=${(page - 1) * 8}`,
  });

  const { data: FeedDeleteResponse, request: useFeedDelete } = useDelete({
    url: `subjects/${id}`,
  });

  const handleFeedDelete = () => {
    const remove = window.confirm("피드를 삭제할까요?");
    if (remove) {
      useFeedDelete();
    }
  };

  const { count, next, results: feedCardList } = feedCardData ?? {};

  useEffect(() => {
    getFeedCardData();
  }, []);

  useEffect(() => {
    if (feedDataList.length < count) {
      getFeedCardData();
    }
  }, [page]);

  useEffect(() => {
    setFeedDataList((prevDataList) => [
      ...(prevDataList ?? []),
      ...(feedCardList ?? []),
    ]);
  }, [feedCardList]);

  useEffect(() => {
    if (page === 1) observe(target.current);

    if (!next || feedDataList.length >= count) {
      unobserve(target.current);
    }
  }, [feedDataList, count, next]);

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
        feedCardList={feedDataList}
        count={count}
        isLoading={isLoading}
        error={error}
      />
      <div ref={target} style={{ width: "100%", height: 30 }} />
    </FeedLayout>
  );
};

export default AnswerPage;
