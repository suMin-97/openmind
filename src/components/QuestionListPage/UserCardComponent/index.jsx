import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserCardComponent = ({ list }) => {
  return (
    <UserCard>
      {list?.results?.map((e) => {
        return (
          <Link to={`/post/${e.id}`}>
            <img src={e.imageSource} />
          </Link>
        );
      })}
    </UserCard>
  );
};

export default UserCardComponent;

const UserCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 20px;
  column-gap: 20px;
  margin: 0 auto;
  width: 940px;
  height: fit-content;
`;
