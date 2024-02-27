import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";

const QuestionListPage = () => {
  const {
    data: questionListData,
    error,
    isLoading,
    request,
  } = useRequest({
    method: "GET",
    url: "subjects",
  });
  const {
    data: postData,
    error: postError,
    request: postRequest,
  } = useRequest({
    method: "POST",
    url: "subjects",
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
      {questionListData?.results?.map((e) => {
        return (
          <>
            <p>{e.name}</p>
            <img src={e.imageSource} />
          </>
        );
      })}
      <button onClick={() => postRequest({ name: "1234", team: "4-19" })}>
        request
      </button>
    </div>
  );
};

export default QuestionListPage;
