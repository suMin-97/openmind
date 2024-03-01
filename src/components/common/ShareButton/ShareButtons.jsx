import FacebookShareButton from "./FacebookShareButton";
import UrlShareButton from "./UrlShareButton";
import KakaoShareButton from "./kakaoShareButton";

const ShareButtons = ({ path }) => {
  return (
    <div>
      <UrlShareButton path={path} />
      <KakaoShareButton path={path} />
      <FacebookShareButton />
    </div>
  );
};

export default ShareButtons;
