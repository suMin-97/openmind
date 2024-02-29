import useRequest from "../../hooks/useRequest";
import { useEffect } from "react";
function FeedPageProfile() {
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
    <div>
      <div>
        <img src={feedProfileData?.imageSource} />
        <p>{feedProfileData?.name}</p>
      </div>
    </div>
  );
}

export default FeedPageProfile;
