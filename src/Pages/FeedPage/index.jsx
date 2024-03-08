import { Link } from "react-router-dom";
import Modalsection from "../../components/FeedPage/ModalSection";
import ShareButtons from "../../components/common/ShareButtons";
import { useParams } from "react-router-dom";
import FeedCardList from "../../components/common/FeedCardList";
import FeedHeader from "../../components/FeedPage/FeedHeader";
import { useEffect } from "react";

import { useState } from "react";
import useRequest from "../../hooks/useRequest";

const FeedPage = () => {
  const { id } = useParams();
  const [data, setQuestionData] = useState({
    data: [],
  });

  const {
    data: apiQuestionData,
    request,
    isLoading,
    error,
  } = useRequest({
    url: `subjects/${id}/questions`,
    method: "GET",
  });

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    if (apiQuestionData) {
      const { count, results } = apiQuestionData;
      setQuestionData((prevData) => ({
        data: [...prevData.data, ...results],
      }));
    }
  }, [apiQuestionData]);

  return (
    <div>
      <Link to="/">메인 페이지</Link>
      <Link to="/list">리스트 페이지</Link>
      <Link to={`/post/${id}/answer`}>답변 페이지</Link>
      <FeedHeader />
      <ShareButtons id={id} />
      <FeedCardList
        feedCards={apiQuestionData}
        isLoading={isLoading}
        error={error}
        count={apiQuestionData?.count}
      />
      <Modalsection subjectId={id} />
    </div>
  );
};

export default FeedPage;
