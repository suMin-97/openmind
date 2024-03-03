import { FacebookIcon, FacebookShareButton } from "react-share";
import UrlShareButton from "../UrlShareButton";
import KakaoShareButton from "../KakaoShareButton";
import { BASIC_DEPLOY_URL } from "../../../constants/constants";

const ShareButtons = ({ id }) => {
  const url = `${BASIC_DEPLOY_URL}/post/${id}`;

  return (
    <div>
      <UrlShareButton url={url} />
      <KakaoShareButton url={url} />
      <FacebookShareButton url={url}>
        <FacebookIcon size={30} round={true} />
      </FacebookShareButton>
    </div>
  );
};

export default ShareButtons;
