import { BASIC_DEPLOY_URL } from "../../../constants/constants";
import styled from "styled-components";
import Kakaotalk from "../../../assets/icons/Kakaotalk.svg";
import { colors } from "../../../styles/styleVariables";

const KakaoShareButton = ({ url }) => {
  const handlebuttonClick = () => {
    Kakao.init("83c8ec896557d0007b7c120c91c368c8");
    console.log(Kakao.isInitialized());

    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "Open Mind",
        description: "솔직한 질문을 통해 상대와 더 가까워 지세요!",
        imageUrl:
          "http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: "솔직하게 질문 하기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        {
          title: "솔직하게 질문 받기",
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
      <img src={Kakaotalk} />
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
