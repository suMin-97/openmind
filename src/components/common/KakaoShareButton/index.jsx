import { BASIC_DEPLOY_URL } from "../../../constants/constants";
import styled from "styled-components";
import Kakaotalk from "../../../assets/icons/Kakaotalk.svg";
import { colors } from "../../../styles/styleVariables";
import { useState } from "react";

const KakaoShareButton = ({ url, subjectName }) => {
  const [initialInstall, setInitialInstall] = useState(false);

  const handlebuttonClick = () => {
    if (!initialInstall) {
      Kakao.init("83c8ec896557d0007b7c120c91c368c8");
      setInitialInstall(true);
    }

    Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "Open mind",
        description: subjectName
          ? `${subjectName}님에게 질문해보세요!`
          : "솔직한 질문을 통해 상대와 더 가까워지세요!",
        imageUrl:
          "https://postfiles.pstatic.net/MjAyNDAzMDlfMTU4/MDAxNzA5OTg4NTM1NTY2.SseBLSmwDAswgpjrHT5PHZwnrPwAap1u3HVxnfBCMfcg.WlEhaYdLOMz5KGIsgWsKuc_ENwG11sK2lf8Oz8C7FBgg.PNG/kakaotalk.png?type=w966",
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
