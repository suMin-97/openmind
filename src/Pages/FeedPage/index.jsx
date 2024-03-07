import { useParams } from "react-router-dom";
import Modalsection from "@components/FeedPage/ModalSection";
import FeedContainer from "@components/common/FeedContainer";
import FeedLayout from "@layout/FeedLayout";

const FeedPage = () => {
  const { id } = useParams();

  return (
    <FeedLayout id={id} $feedType="question">
      <FeedContainer subjectId={id} />
      <Modalsection subjectId={id} />
    </FeedLayout>
  );
};

export default FeedPage;
