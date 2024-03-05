import { useState } from "react";
import Toast from "../Toast";
import styled from "styled-components";
import LinkIcon from "../../../assets/icons/Link.svg";
import { colors } from "../../../styles/styleVariables";

const UrlShareButton = ({ url }) => {
  const [copyUrlStatus, setCopyUrlStatus] = useState("idle"); // 분기 처리를 위해 idle, success, error로 상태를 구분함, 간단한 비동기 함수라 loading은 생략함, 필요시 도입 가능함

  const handleButtonClick = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
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
      <StyledButton
        disabled={!(copyUrlStatus === "idle")} // 중복으로 여러번 클릭 방지를 위해 토스트 활성화 되어있는 동안 버튼 비활성화 시킴
        onClick={() => handleButtonClick(url)}
      >
        <img src={LinkIcon} />
      </StyledButton>
      {copyUrlStatus === "success" && <Toast>URL이 복사되었습니다</Toast>}
      {copyUrlStatus === "error" && <Toast>URL 복사에 실패했습니다</Toast>}
    </>
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
  background: ${colors.brown50};

  img {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`;

export default UrlShareButton;
