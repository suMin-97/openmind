import useRequest from "../../hooks/useRequest";
import { useEffect } from "react";

const FeedSection = () => {
  const {
    data: feedSubjectQuestion,
    error,
    isLoading,
    request,
  } = useRequest({
    method: "GET",
    url: "subjects/3825/questions",
  });

  useEffect(() => {
    request({ limit: 10, offset: 0 });
  }, []);

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    console.log("isLoading : " + isLoading);
  }, [isLoading]);
  return (
    <div>
      <h1>{feedSubjectQuestion?.count}개의 질문이 있습니다.</h1>
    </div>
  );
};

export default FeedSection;
