import FacebookShareButton from "./FacebookShareButton";
import UrlShareButton from "./UrlShareButton";
import KakaoShareButton from "./kakaoShareButton";

const ShareButtons = ({ path }) => {
  return (
    <div>
      <UrlShareButton path={path} />
      <KakaoShareButton />
      <FacebookShareButton />
    </div>
  );
};

export default ShareButtons;
