import { BASIC_DEPLOY_URL } from "../../../constants/constants";
import styled from "styled-components";
import Kakaotalk from "../../../assets/icons/Kakaotalk.svg";
import { colors } from "../../../styles/styleVariables";

const KakaoShareButton = ({ url, subjectName }) => {
  const handlebuttonClick = () => {
    Kakao.init("83c8ec896557d0007b7c120c91c368c8");
    console.log(Kakao.isInitialized());

    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "Open mind",
        description: subjectName
          ? `${subjectName}님에게 질문해보세요!`
          : "솔직한 질문을 통해 상대와 더 가까워지세요!",
        imageUrl:
          "https://s3-alpha-sig.figma.com/img/e5e8/dc33/694abe44ca2384222acde718b169156b?Expires=1710720000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JNz-z9uKwqS~K6QDbgM3RMDA92QdY2~NW0Wco7Qj~Wn1iQnw1EX89QEi3hU58AirtikukJI6xDaE9amZZhdWENfi-kIM79aO2XJyk0spaP6RiWNJoj0MmQiVcwaGI-iBUDw2tE8xjCo~39Ad-6rQ0xo2vSK63O6T29eAlcIE6rdpUs22AvMc8bsumGcvtfH4Ub8Tb3nZWwdZAmtoQeMgyN-7QATOPIOISM6oUZS5RL3xCB2L63depmRDK6~8Bl-yBBOZdMMPKdVfd35lwCoHOP019QklC8y8qdSmRDNcPkcEirU~nLTP2SQA8b~6tZTUM52pzn3GTHIT4XIoHkkf4g__",
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: "질문 하기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        {
          title: "질문 받기",
          link: {
            mobileWebUrl: BASIC_DEPLOY_URL,
            webUrl: BASIC_DEPLOY_URL,
          },
        },
      ],
    });
  };

  return (
    <StyledButton onClick={handlebuttonClick}>
      <img src={Kakaotalk} draggable="false" />
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  width: 40px;
  height: 40px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border: none;
  border-radius: 200px;
  background: ${colors.yellow};

  img {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`;

export default KakaoShareButton;
