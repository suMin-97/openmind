import useRequest from "@hooks/useRequest";
import { useEffect } from "react";
import styled from "styled-components";
import { boxStyles, colors, devices } from "@styles/styleVariables";
import FeedCountMessage from "../FeedCountMessage";

const BasicFeedContainer = ({ className }) => {
  const {
    data: feedData,
    isLoading,
    error,
    request,
  } = useRequest({ method: "GET", url: "subjects/3816/questions" });

  useEffect(() => {
    request();
  }, []);
  const feedCardList = feedData?.results;

  const feedContent = () => {
    // 상태 관리 정리 필요합니다!!
    // 일단 이렇게 만들어두었어요
    if (isLoading) {
      // 로딩중일 때 노출될 컴포넌트 (추후 수정)
      return <div>로딩중</div>;
    }

    if (error) {
      // 에러 상태일 때 노출될 컴포넌트 (추후 수정)
      return <div>error</div>;
    }

    if (feedCardList?.length === 0) {
      // 추후 NoFeedCard 컴포넌트로 대체합니다.
      return <div>빈칸</div>;
    }

    if (feedCardList?.length > 0) {
      return (
        // 추후 FeedCardList 컴포넌트로 대체합니다.
        <div>
          {feedCardList?.map(({ id, content }) => (
            <li key={id}>{content}</li>
          ))}
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <FeedCountMessage
        count={feedCardList?.count ?? 0}
        isLoading={isLoading}
      />
      {feedContent()}
    </div>
  );
};

const FeedContainer = styled(BasicFeedContainer)`
  ${boxStyles.flexColumnCenter};
  gap: 1rem;
  width: 100%;
  ${boxStyles.padding16};
  border: 1px solid ${colors.brown30};
  ${boxStyles.radius16};
  background-color: ${colors.brown10};

  @media ${devices.tablet} {
    max-width: 716px;
  }
`;

export default FeedContainer;
