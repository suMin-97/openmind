import { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import boxStyles from "../../styles/boxStyles";
import useDelete from "../../components/AnswerPage/MoreDropdown/useDelete";
import FeedContainer from "@components/common/FeedContainer";
import DeleteFloatingButton from "@components/AnswerPage/DeleteFloatingButton";

const AnswerPage = () => {
  // 추후 삭제 확인 후 페이지 이동시 사용
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: FeedDeleteResponse,
    error,
    isLoading,
    request: useFeedDelete,
  } = useDelete({
    url: `subjects/${id}`,
  });

  const handleFeedDelete = () => {
    const remove = window.confirm("피드를 삭제할까요?");
    if (remove) {
      useFeedDelete();
    }
  };

  useEffect(() => {
    const status = FeedDeleteResponse?.status;
    if (status && status >= 200 && status < 300) {
      navigate("/");
    }
    // 로컬스토리지에 저장되어있던 Id 생성 정보를 삭제하는 로직 추가 필요
  }, [FeedDeleteResponse]);

  return (
    <Container>
      <h1>답변 페이지</h1>
      <Link to="/">메인 페이지</Link>
      <Link to="/list">리스트 페이지</Link>
      <Link to={`/post/${id}`}>피드 페이지</Link>
      <DeleteFloatingButton handleDelete={handleFeedDelete} />
      <FeedContainer subjectId={id} cardType="answerFeed" />
    </Container>
  );
};

const Container = styled.div`
  ${boxStyles.flexColumnCenter};
`;

export default AnswerPage;
