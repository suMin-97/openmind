import { useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import styled from "styled-components";
import ListHeaderComponent from "../../components/QuestionListPage/ListHeaderComponent";
import SortDropdownComponent from "../../components/QuestionListPage/SortDropdownComponent";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { colors, fontStyles } from "@styles/styleVariables";
import { SUBJECT_PAGE_LIMIT } from "../../constants/constants";
import ListPagination from "../../components/QuestionListPage/ListPagination";

const QuestionListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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
    request({
      // limit: searchParams.get("limit") ?? 8,
      // limit는 8로 고정, pagination 사용을 위함
      limit: SUBJECT_PAGE_LIMIT,
      offset: searchParams.get("page")
        ? (searchParams.get("page") - 1) * SUBJECT_PAGE_LIMIT
        : 0,
      sort: searchParams.get("sort"),
    });
  }, [searchParams]);

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
      <ListPagination totalCount={questionListData?.count ?? 0} />
      <button onClick={() => request()}>request</button>
    </>
  );
};

export default QuestionListPage;

const ListArticle = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 20px;
  column-gap: 20px;
  margin: 0 auto;
  width: 940px;
  height: fit-content;
`;

const MainText = styled.div`
  color: ${colors.gray60};
  text-align: center;
  font-feature-settings:
    "clig" off,
    "liga" off;
  ${fontStyles.h1};
  ${fontStyles.regular};
`;
