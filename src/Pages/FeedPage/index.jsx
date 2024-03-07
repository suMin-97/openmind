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

  const handleSubmitSuccess = (value) => {
    setQuestionData((prevData) => ({
      data: [value, ...prevData.data],
    }));
  };

  useEffect(() => {
    request();
  }, []);
  useEffect(() => {
    if (apiQuestionData) {
      // apiQuestionData가 존재할 때만 처리
      const { count, results } = apiQuestionData;
      setQuestionData((prevData) => ({
        data: [...prevData.data, ...results],
      }));
      // setListAll(count); // 이 부분에서 setListAll은 어디서 왔는지 명시되어 있지 않습니다.
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
      <Modalsection subjectId={id} onSubmitSuccess={handleSubmitSuccess} />
    </div>
  );
};

export default FeedPage;
