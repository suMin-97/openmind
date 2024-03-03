import { Link } from "react-router-dom";
import useRequest from "../../hooks/useRequest";
import { useEffect } from "react";
import * as styled from "./StylePostHeader";
import logoImg from "../../assets/images/logo.svg";

const FeedPageProfile = () => {
  const {
    data: feedProfileData,
    error,
    isLoading,
    request,
  } = useRequest({
    method: "GET",
    url: "subjects/3825",
  });

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    console.log(error);
  }, [error]);

  useEffect(() => {
    console.log("isLoading : " + isLoading);
  }, [isLoading]);
  return (
    <>
      <styled.Header>
        <styled.Container>
          <Link to={"/"}>
            <styled.Logo src={logoImg} />
          </Link>
          {feedProfileData?.imageSource && (
            <img src={feedProfileData?.imageSource} />
          )}
          <styled.Name>{feedProfileData?.name ?? error}</styled.Name>
        </styled.Container>
      </styled.Header>
    </>
  );
};

export default FeedPageProfile;
