import { FacebookIcon, FacebookShareButton } from "react-share";
import UrlShareButton from "./UrlShareButton";
import KakaoShareButton from "./kakaoShareButton";

const ShareButtons = ({ url }) => {
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
