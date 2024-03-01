import { useEffect } from "react";

const KakaoShareButton = ({ url }) => {
  useEffect(() => {
    Kakao.init("83c8ec896557d0007b7c120c91c368c8");
    console.log(Kakao.isInitialized());
  }, []);

  const handlebuttonClick = () => {
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
          title: "솔직하게 질문하러 가기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return <button onClick={handlebuttonClick}>kakao</button>;
};

export default KakaoShareButton;
