import { FacebookShareButton } from "react-share";
import UrlShareButton from "../UrlShareButton";
import KakaoShareButton from "../KakaoShareButton";
import { BASIC_DEPLOY_URL } from "../../../constants/constants";
import styled from "styled-components";
import FacebookIcon from "../../../assets/icons/Facebook.svg";
import { colors } from "../../../styles/styleVariables";

const ShareButtons = ({ id }) => {
  const url = `${BASIC_DEPLOY_URL}/post/${id}`;

  return (
    <WrappedDiv>
      <ContainDiv>
        <UrlShareButton url={url} />
        <KakaoShareButton url={url} />
        <FacebookShareButton url={url}>
          <StyledDiv>
            <img src={FacebookIcon} />
          </StyledDiv>
        </FacebookShareButton>
      </ContainDiv>
    </WrappedDiv>
  );
};

const WrappedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContainDiv = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 12px;
  button:hover {
    cursor: pointer;
  }
`;

const StyledDiv = styled.div`
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
  background: ${colors.blue};

  img {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
  }
`;

export default ShareButtons;
