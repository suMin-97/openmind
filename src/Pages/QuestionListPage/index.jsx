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
import UserCardComponent from "../../components/QuestionListPage/UserCardComponent";

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
      <UserCardComponent list={questionListData} />
      <ListPagination totalCount={questionListData?.count ?? 0} />
      <button onClick={() => request()}>request</button>
    </>
  );
};

export default QuestionListPage;

const MainText = styled.div`
  color: ${colors.gray60};
  text-align: center;
  font-feature-settings:
    "clig" off,
    "liga" off;
  ${fontStyles.h1};
  ${fontStyles.regular};
`;
