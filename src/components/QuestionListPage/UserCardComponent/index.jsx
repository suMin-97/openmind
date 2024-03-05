import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors, fontStyles } from "@styles/styleVariables";
import message from "@icons/Messages.svg";

const UserCardComponent = ({ list }) => {
  return (
    <UserCardWrapper>
      {list?.results?.map((e) => {
        return (
          <Link to={`/post/${e.id}`}>
            <UserCard>
              <img className={"cardImg"} src={e.imageSource} />
              <h2 className="cardName">{e.name}</h2>
              <div className="cardInfo">
                <p className="qCountText">
                  <img src={message} />
                  받은 질문
                </p>
                <p className="qCount">{`${e.questionCount}개`}</p>
              </div>
            </UserCard>
          </Link>
        );
      })}
    </UserCardWrapper>
  );
};

export default UserCardComponent;

const UserCardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 20px;
  column-gap: 20px;
  margin: 0 auto;
  width: 940px;
  height: fit-content;
  a {
    text-decoration-line: none;
  }
  @media (max-width: 949px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 0;
    grid-column: 2;
    width: 700px;
    height: 394px;
    overflow: hidden;
  }
`;
const UserCard = styled.div`
  display: flex;
  width: 220px;
  height: 187px;
  padding: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 16px;
  border: 1px solid ${colors.gray40};
  background: ${colors.gray10};
  .cardImg {
    width: 60px;
    height: 60px;
    border-radius: 60px;
  }
  .cardName {
    margin: 12px 0 28px 0;
    ${fontStyles.body1};
    ${fontStyles.regular};
    color: ${colors.gray60};
  }
  .cardInfo {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    color: ${colors.gray40};
    ${fontStyles.body3};
    .qCountText {
      display: flex;
      gap: 4px;
      align-items: center;
      img {
        opacity: 0.6;
        width: 18px;
        height: 18px;
      }
    }
  }
`;
