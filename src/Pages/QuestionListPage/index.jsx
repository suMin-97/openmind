import { useEffect, useState } from "react";
import useRequest from "../../hooks/useRequest";
import styled from "styled-components";
import ListHeaderComponent from "../../components/QuestionListPage/ListHeaderComponent";
import SortDropdownComponent from "../../components/QuestionListPage/SortDropdownComponent";
import { useSearchParams } from "react-router-dom";
import { colors, fontStyles } from "@styles/styleVariables";
import ListPagination from "../../components/QuestionListPage/ListPagination";
import UserCardComponent from "../../components/QuestionListPage/UserCardComponent";
import { debounce } from "lodash";

const QuestionListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageLimit, setPageLimit] = useState(8);

  const handleResize = debounce(() => {
    if (window.innerWidth > 949) {
      setPageLimit(8);
    } else {
      setPageLimit(6);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      limit: pageLimit,
      offset: searchParams.get("page")
        ? (searchParams.get("page") - 1) * pageLimit
        : 0,
      sort: searchParams.get("sort"),
    });
  }, [searchParams, pageLimit]);

  return (
    <QuestionListSection>
      <ListHeaderComponent />
      <MainText>누구에게 질문할까요?</MainText>
      <SortDropdownComponent />
      <UserCardComponent list={questionListData} />
      <ListPagination
        totalCount={questionListData?.count ?? 0}
        pageLimit={pageLimit}
      />
    </QuestionListSection>
  );
};

export default QuestionListPage;
const QuestionListSection = styled.section`
  background-color: ${colors.gray20};
  margin: 0;
  height: 100vh;
`;
const MainText = styled.div`
  color: ${colors.gray60};
  text-align: center;
  ${fontStyles.h1};
  ${fontStyles.regular};
`;
