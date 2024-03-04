import { useParams } from "react-router-dom";
import useRequest from "../../../hooks/useRequest";
import { useEffect } from "react";

const FeedPageProfile = () => {
  const { id } = useParams();

  const {
    data: feedProfileData,
    error,
    isLoading,
    request,
  } = useRequest({
    method: "GET",
    url: `subjects/${id}`,
  });

  useEffect(() => {
    request();
  }, []);

  return (
    <div>
      <div>
        {feedProfileData?.imageSource && (
          <img src={feedProfileData?.imageSource} />
        )}
        {feedProfileData?.name ?? error}
      </div>
    </div>
  );
};

export default FeedPageProfile;
