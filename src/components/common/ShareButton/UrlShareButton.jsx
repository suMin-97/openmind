import { useState } from "react";
import { BASIC_DEPLOY_URL } from "../../../constants/constants";
import Toast from "../Toast/Toast";

const UrlShareButton = ({ path }) => {
  const [copyUrlStatus, setCopyUrlStatus] = useState("idle"); // 분기 처리를 위해 idle, success, error로 상태를 구분함, 간단한 비동기 함수라 loading은 생략함, 필요시 도입 가능함

  const handleButtonClick = async (currentPath) => {
    try {
      const copyUrl = `${BASIC_DEPLOY_URL}${currentPath}`;
      await navigator.clipboard.writeText(copyUrl);
      setCopyUrlStatus("success");
      setTimeout(() => {
        setCopyUrlStatus("idle");
      }, 5000);
    } catch (error) {
      setCopyUrlStatus("error");
      setTimeout(() => {
        setCopyUrlStatus("idle");
      }, 5000);
    }
  };

  return (
    <>
      <button
        disabled={!(copyUrlStatus === "idle")} // 중복으로 여러번 클릭 방지를 위해 토스트 활성화 되어있는 동안 버튼 비활성화 시킴
        onClick={() => handleButtonClick(path)}
      >
        URL
      </button>
      {copyUrlStatus === "success" && <Toast>클립보드 복사 성공</Toast>}
      {copyUrlStatus === "error" && <Toast>클립보드 복사 실패</Toast>}
    </>
  );
};

export default UrlShareButton;
