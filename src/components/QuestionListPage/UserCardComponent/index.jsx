import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors, fontStyles, devices, boxStyles } from "@styles/styleVariables";
import { ReactComponent as MessageIcon } from "@icons/Messages.svg";

const UserCardComponent = ({ list, isLoading, error, pageLimit }) => {
  const skeletonCard = useMemo(
    () => (
      <>
        {[...Array(Number(pageLimit))].map((e, i) => (
          <UserCard key={i}>
            <div className={"cardImg skeleton"}></div>
            <h2 className="cardName skeleton">isLoading</h2>
            <div className="cardInfo skeleton">isLoading</div>
          </UserCard>
        ))}
      </>
    ),
    [pageLimit]
  );
  return (
    <UserCardWrapper>
      {isLoading ? (
        <>{skeletonCard}</>
      ) : (
        list?.results?.map((e, i) => {
          return (
            <Link to={`/post/${e.id}`} key={e.name + i}>
              <UserCard>
                <img
                  className={"cardImg"}
                  src={e.imageSource}
                  draggable="false"
                />
                <h2 className="cardName">{e.name}</h2>
                <div className="cardInfo">
                  <p className="qCountText">
                    <MessageIcon fill={colors.gray40} width="18" height="18" />
                    받은 질문
                  </p>
                  <p className="qCount">{`${e.questionCount}개`}</p>
                </div>
              </UserCard>
            </Link>
          );
        })
      )}
    </UserCardWrapper>
  );
};

export default UserCardComponent;

const UserCardWrapper = styled.div`
  display: grid;
  row-gap: 20px;
  column-gap: 20px;
  height: fit-content;
  margin: 0 auto;
  a {
    text-decoration-line: none;
  }
  grid-template-columns: repeat(2, minmax(155.5px, 50%));
  grid-template-rows: 1fr 1fr 1fr;
  overflow: hidden;
  row-gap: 16px;
  column-gap: 16px;
  height: 536px;
  padding: 0 24px 0 24px;
  @media (min-width: 768px) and (max-width: 855px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 0;
    width: 700px;
    height: 394px;
    overflow: hidden;
    padding: 0;
  }
  @media (min-width: 856px) {
    grid-template-columns: repeat(4, minmax(186px, 25%));
    width: calc(100% - 64px);
    height: 394px;
    margin: 0 32px;
    overflow: hidden;
    padding: 0;
  }
  @media ${devices.desktop} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 940px;
    height: 394px;
    margin: 0 auto;
    padding: 0;
  }
`;
const UserCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 16px;
  border: 1px solid ${colors.gray40};
  background: ${colors.gray10};
  height: 168px;
  padding: 16px;
  @media (min-width: 768px) and (max-width: 855px) {
    width: 220px;
    height: 187px;
    padding: 20px;
  }
  @media (min-width: 856px) {
    width: 100%;
    height: 187px;
    padding: 20px;
  }
  @media ${devices.desktop} {
    width: 220px;
  }
  .cardImg {
    &.skeleton {
      ${boxStyles.skeletonAnimation}
    }
    width: 48px;
    height: 48px;
    border-radius: 48px;
    @media ${devices.tablet} {
      width: 60px;
      height: 60px;
      border-radius: 60px;
    }
  }
  .cardName {
    ${fontStyles.regular};
    color: ${colors.gray60};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    &.skeleton {
      ${boxStyles.skeletonAnimation}
      color: transparent;
      border-radius: 15px;
    }
    margin: 12px 0 32px 0;
    ${fontStyles.body2};
    @media ${devices.tablet} {
      margin: 12px 0 28px 0;
      ${fontStyles.body1};
    }
  }
  .cardInfo {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    color: ${colors.gray40};
    &.skeleton {
      color: transparent;
      border-radius: 15px;
      width: 50%;
      ${boxStyles.skeletonAnimation}
    }
    .qCountText {
      display: flex;
      gap: 4px;
      align-items: center;
    }
    ${fontStyles.caption};
    @media ${devices.tablet} {
      ${fontStyles.body3};
    }
  }
`;
