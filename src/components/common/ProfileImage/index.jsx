import styled from "styled-components";
import { devices, boxStyles } from "@styled/styleVariables";

// 프로필이미지 사용하고싶은 곳에 api 호출을 하고

// 피드헤더 부분에 적용했습니다. ex)  <ProfileImage src={ProfileData?.imageSource} size="xxLarge" />
// src에는 주소를, size에는 밑에 선언된 스타일에 맞게 "xxlarge", "xlarge" 등 사용되는 프로필사이즈에 맞춰서 넣어 사용하시면 됩니다.

function ProfileImage({ src, size }) {
  return (
    <Container $size={size}>
      <Img src={src} />
    </Container>
  );
}

export default ProfileImage;

const SIZES = {
  xxLarge: 136, // 헤더PC
  xLarge: 104, // 헤더 모바일
  Large: 60, // 질문 리스트
  medium: 48, // 답변 리스트
  xSmall: 28, // 모달창
};

const Container = styled.div`
  width: ${({ $size }) => ($size ? SIZES[$size] : SIZES["Large"])}px;
  height: ${({ $size }) => ($size ? SIZES[$size] : SIZES["Large"])}px;
  ${boxStyles.radiusC};
  overflow: hidden;
  flex-shrink: 0;
  text-align: center;

  @media ${devices.tablet} {
    width: ${({ $size }) => {
      if ($size === "xLarge") {
        return SIZES["xxLarge"];
      } else {
        return SIZES[$size];
      }
    }}px;
    height: ${({ $size }) => {
      if ($size === "xLarge") {
        return SIZES["xxLarge"];
      } else {
        return SIZES[$size];
      }
    }}px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;
