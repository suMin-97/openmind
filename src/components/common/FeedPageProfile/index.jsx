import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useRequest from "@hooks/useRequest";

const FeedPageProfile = () => {
  const { id } = useParams();

  const { data: feedProfileData, request } = useRequest({
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
        {feedProfileData?.name ?? <span>정보를 불러오는데 실패했습니다.</span>}
      </div>
    </div>
  );
};

export default FeedPageProfile;
