import { Link } from "react-router-dom";
import Modalsection from "../../components/FeedPage/ModalSection";
import ShareButtons from "../../components/common/ShareButtons";
import { useParams } from "react-router-dom";
import FeedCardList from "../../components/common/FeedCardList";
import FeedHeader from "../../components/FeedPage/FeedHeader";
import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { useState } from "react";

const FeedPage = () => {
  const { id } = useParams();

  const FeedCardsUrl = `subjects/${id}/questions`;
  const {
    data: test,
    error,
    isLoading,
    request: getFeedCardsRequest,
  } = useRequest({ url: FeedCardsUrl, method: "GET" });

  useEffect(() => {
    getFeedCardsRequest();
  }, []);

  return (
    <div>
      <Link to="/">메인 페이지</Link>
      <Link to="/list">리스트 페이지</Link>
      <Link to={`/post/${id}/answer`}>답변 페이지</Link>
      <FeedHeader />
      <ShareButtons id={id} />
      <FeedCardList
        feedCards={test}
        isLoading={isLoading}
        error={error}
        total={test?.count}
      />
      <Modalsection subjectId={id} />
    </div>
  );
};

export default FeedPage;
