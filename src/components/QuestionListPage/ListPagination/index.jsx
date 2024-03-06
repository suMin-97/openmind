import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { colors, fontStyles } from "@styles/styleVariables";

const ListPagination = ({ totalCount, pageLimit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [curPage, setCurPage] = useState({ page: 1, size: 0 });
  const [pageList, setPageList] = useState([]);

  const range = (start, end) => {
    let array = [];
    for (let i = start; i < end + 1; ++i) {
      array.push(i);
    }
    return array;
  };

  useEffect(() => {
    setCurPage({
      ...curPage,
      size: Math.ceil(totalCount / pageLimit),
    });
  }, [totalCount, pageLimit]);

  useEffect(() => {
    setCurPage({
      ...curPage,
      page: Number(searchParams.get("page")) ?? 1,
    });
  }, [searchParams]);

  useEffect(() => {
    if (curPage.page <= 3) {
      setPageList(range(1, Math.min(5, curPage.size)));
    } else if (curPage.page >= curPage.size - 2) {
      setPageList(range(curPage.size - 4, curPage.size));
    } else {
      setPageList(range(curPage.page - 2, curPage.page + 2));
    }
  }, [curPage]);

  const setPage = (num) => {
    searchParams.set("page", num);
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <PaginationDiv>
      <PageButton
        onClick={() =>
          setPage(curPage?.page && curPage?.page > 1 ? curPage.page - 1 : 1)
        }
        disabled={curPage?.page === 1}
      >
        {"<"}
      </PageButton>
      {pageList?.map((e) => {
        return (
          <PageButton
            onClick={() => setPage(e)}
            key={e}
            $active={curPage?.page === e}
          >
            {e}
          </PageButton>
        );
      })}
      <PageButton
        onClick={() =>
          setPage(
            curPage?.page && curPage?.page < curPage.size
              ? curPage.page + 1
              : curPage.size
          )
        }
        disabled={curPage.page === curPage.size}
      >
        {">"}
      </PageButton>
    </PaginationDiv>
  );
};

export default ListPagination;

const PaginationDiv = styled.div`
  display: flex;
  margin: 40px auto 97px auto;
  width: fit-content;
  height: 40px;
`;
const PageButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-family: Actor;
  color: ${(props) => (props.$active ? colors.brown40 : colors.gray40)};
  ${fontStyles.body1};
  &:disabled {
    cursor: default;
    color: ${colors.gray30};
  }
`;
