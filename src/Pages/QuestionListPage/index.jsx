import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import styled from "styled-components";
import ListHeaderComponent from "../../components/QuestionListPage/ListHeaderComponent";
import SortDropdownComponent from "../../components/QuestionListPage/SortDropdownComponent";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    request({ limit: 4, offset: 0 });
  }, []);

  return (
    <>
      <ListHeaderComponent />
      <MainText>누구에게 질문할까요?</MainText>
      <SortDropdownComponent />
      <ListArticle>
        {questionListData?.results?.map((e) => {
          return (
            <Link to={`/post/${e.id}`}>
              <img src={e.imageSource} />
            </Link>
          );
        })}
      </ListArticle>
      <button onClick={() => request()}>request</button>
    </>
  );
};

export default QuestionListPage;

const ListArticle = styled.article`
  display: flex;
  gap: 40px;
  margin: 0 auto;
`;

const MainText = styled.div`
  color: var(--Grayscale-60, #000);
  text-align: center;
  font-feature-settings:
    "clig" off,
    "liga" off;
  font-family: Pretendard;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
