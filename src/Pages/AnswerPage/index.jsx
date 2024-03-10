import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRequest from "@hooks/useRequest";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import FeedLayout from "@layout/FeedLayout";
import FeedContainer from "@components/common/FeedContainer";
import DeleteFloatingButton from "@components/AnswerPage/DeleteFloatingButton";

const PAGE_LIMIT = 8;

const AnswerPage = () => {
  const [page, setPage] = useState({ curPage: 1 });
  const [feedDataList, setFeedDataList] = useState([]);
  const target = useRef();
  const navigate = useNavigate();
  const { id } = useParams();

  const [observe, unobserve] = useIntersectionObserver(() => {
    setPage((prevPage) => ({
      curPage: prevPage.curPage + 1,
    }));
  });

  const {
    data: subjectData,
    error: subjectError,
    isLoading: subjectDataLoading,
    request: getSubjectData,
  } = useRequest({ method: "GET", url: `subjects/${id}` });

  const {
    data: feedCardData,
    isLoading,
    error,
    status,
    request: getFeedCardData,
  } = useRequest({
    method: "GET",
    url: `subjects/${id}/questions`,
  });

  const { status: deleteResponseStatus, request: useFeedDelete } = useRequest({
    url: `subjects/${id}`,
    method: "DELETE",
  });

  const handleFeedDelete = () => {
    const remove = window.confirm("피드를 삭제할까요?");
    if (remove) {
      useFeedDelete();
    }
  };

  const { count, next, results: feedCardList } = feedCardData ?? {};

  useEffect(() => {
    getSubjectData();
  }, []);

  useEffect(() => {
    getFeedCardData({
      limit: PAGE_LIMIT,
      offset: (page.curPage - 1) * PAGE_LIMIT,
    });
    if (status === 404) {
      navigate("/not-found");
    }
  }, [page]);

  useEffect(() => {
    setFeedDataList((prevDataList) => [
      ...(prevDataList ?? []),
      ...(feedCardList ?? []),
    ]);
    if (page.curPage === 1) observe(target.current);

    if (!next || feedDataList.length >= count) {
      unobserve(target.current);
    }
  }, [feedCardList, count, next]);

  useEffect(() => {
    const status = deleteResponseStatus;
    if (status && status >= 200 && status < 300) {
      localStorage.removeItem("id");
      navigate("/");
    }
  }, [deleteResponseStatus]);

  return (
    <FeedLayout
      id={id}
      $feedType="answer"
      subjectData={subjectData}
      isLoading={subjectDataLoading}
      error={subjectError}
    >
      <DeleteFloatingButton handleDelete={handleFeedDelete} />
      <FeedContainer
        subjectId={id}
        cardType="answerFeed"
        feedCardList={feedDataList}
        count={count}
        isLoading={isLoading}
        error={error}
        subjectData={subjectData}
      />
      <div ref={target} style={{ width: "100%", height: 30 }} />
    </FeedLayout>
  );
};

export default AnswerPage;
