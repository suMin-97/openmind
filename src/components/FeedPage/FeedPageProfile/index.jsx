import useRequest from "../../../hooks/useRequest";
import { useEffect } from "react";
function FeedPageProfile({ subjectId }) {
  const {
    data: feedProfileData,
    error,
    isLoading,
    request,
  } = useRequest({
    method: "GET",
    url: `subjects/${subjectId}`,
  });

  useEffect(() => {
    request();
  }, []);

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
