import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { colors, fontStyles } from "@styles/styleVariables";

const ListPagination = ({ totalCount, pageLimit }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageList, setPageList] = useState([]);

  const range = (start, end) => {
    let array = [];
    for (let i = start; i < end + 1; ++i) {
      array.push(i);
    }
    return array;
  };

  const currentSize = useMemo(
    () => Math.ceil(totalCount / pageLimit),
    [totalCount, pageLimit]
  );

  const currentPage = useMemo(() => {
    return Number(searchParams.get("page")) ?? 1;
  }, [searchParams, currentSize]);

  useEffect(() => {
    const pageNum = Number(searchParams.get("page")) ?? 1;
    console.log(pageNum, currentSize);
    if (currentSize !== 0 && (pageNum > currentSize || isNaN(pageNum))) {
      searchParams.set("page", currentSize);
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, currentSize]);

  useEffect(() => {
    if (currentPage > currentSize) {
      setPageList([]);
    } else if (currentPage <= 3) {
      setPageList(range(1, Math.min(5, currentSize)));
    } else if (currentPage >= currentSize - 2) {
      setPageList(range(currentSize - 4, currentSize));
    } else {
      setPageList(range(currentPage - 2, currentPage + 2));
    }
  }, [currentPage, currentSize]);

  const setPage = (num) => {
    searchParams.set("page", num);
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <PaginationDiv>
      {pageList.length > 0 ? (
        <>
          <PageButton
            onClick={() =>
              setPage(currentPage && currentPage > 1 ? currentPage - 1 : 1)
            }
            disabled={currentPage === 1}
          >
            {"<"}
          </PageButton>
          {pageList?.map((e) => {
            return (
              <PageButton
                onClick={() => setPage(e)}
                key={e}
                $active={currentPage === e}
              >
                {e}
              </PageButton>
            );
          })}
          <PageButton
            onClick={() =>
              setPage(
                currentPage && currentPage < currentSize
                  ? currentPage + 1
                  : currentSize
              )
            }
            disabled={currentPage === currentSize}
          >
            {">"}
          </PageButton>
        </>
      ) : (
        <></>
      )}
    </PaginationDiv>
  );
};

export default ListPagination;

const PaginationDiv = styled.div`
  display: flex;
  margin-inline: auto;
  padding: 40px 0 97px;
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
