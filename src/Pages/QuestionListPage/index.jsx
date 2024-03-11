import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import styled from "styled-components";
import { colors, fontStyles, devices } from "@styles/styleVariables";
import useRequest from "@hooks/useRequest";
import ListHeaderComponent from "@components/QuestionListPage/ListHeaderComponent";
import SortDropdownComponent from "@components/QuestionListPage/SortDropdownComponent";
import ListPagination from "@components/QuestionListPage/ListPagination";
import UserCardComponent from "@components/QuestionListPage/UserCardComponent";

const QuestionListPage = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  const [pageLimit, setPageLimit] = useState(8);

  const handleResize = debounce(() => {
    if (window.innerWidth > 855) {
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
      <div className="question_title">
        <MainText>누구에게 질문할까요?</MainText>
        <SortDropdownComponent />
      </div>
      <UserCardComponent
        list={questionListData}
        isLoading={isLoading}
        error={error}
        pageLimit={pageLimit}
      />
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
  min-height: 100vh;
  height: auto;
  .question_title {
    display: flex;
    flex-direction: row;
    padding: 0 24px 18px 24px;
    justify-content: space-between;
    align-items: center;
    @media ${devices.tablet} {
      flex-direction: column;
      padding: 0;
    }
  }
`;
const MainText = styled.div`
  color: ${colors.gray60};
  text-align: center;
  ${fontStyles.h3};
  ${fontStyles.regular};
  @media ${devices.tablet} {
    ${fontStyles.h1};
    ${fontStyles.regular};
  }
`;
