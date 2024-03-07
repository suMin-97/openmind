import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { colors, boxStyles, fontStyles, devices } from "@styles/styleVariables";
import ModalForm from "../ModalForm";
import closeIcon from "@icons/Close.svg";
import messageIcon from "@icons/Messages.svg";

const Modal = ({ subjectId, setIsModalOpen }) => {
  const modalBg = useRef();

  const handleBGCloseClick = (event) => {
    if (event.target === modalBg.current) {
      setIsModalOpen(false);
    }
  };

  const handleBtnCloseClick = () => {
    setIsModalOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <DimDiv ref={modalBg} onClick={handleBGCloseClick}>
      <ContentsBox>
        <FlexDiv>
          <FlexMessageDiv>
            <img src={messageIcon} />
            <p>질문을 작성하세요</p>
          </FlexMessageDiv>
          <CloseButton onClick={handleBtnCloseClick}>
            <img src={closeIcon} />
          </CloseButton>
        </FlexDiv>
        <ModalForm setIsModalOpen={setIsModalOpen} subjectId={subjectId} />
      </ContentsBox>
    </DimDiv>
  );
};

const Modalsection = ({ subjectId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenClick = () => {
    setIsModalOpen(true);
  };

  return (
    <Footer>
      <MobileButton onClick={handleOpenClick}>질문 작성</MobileButton>
      <TabletButton onClick={handleOpenClick}>질문 작성하기</TabletButton>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} subjectId={subjectId} />
      )}
    </Footer>
  );
};

const Footer = styled.div`
  width: 100%;
`;

const MobileButton = styled.button`
  display: inline-flex;
  height: 54px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  border: none;
  ${boxStyles.radius200};
  background-color: ${colors.brown40};
  ${boxStyles.shadow2};

  color: ${colors.gray10};
  ${fontStyles.regular};
  ${fontStyles.body1};

  position: fixed;
  right: 24px;
  bottom: 24px;

  &: hover {
    cursor: pointer;
  }

  @media ${devices.tablet} {
    display: none;
  }
`;

const TabletButton = styled.button`
  display: none;
  width: 208px;
  height: 54px;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  border: none;
  ${boxStyles.radius200};
  background-color: ${colors.brown40};
  ${boxStyles.shadow2};

  color: ${colors.gray10};
  ${fontStyles.regular};
  ${fontStyles.body1};

  position: fixed;
  right: 24px;
  bottom: 24px;

  &: hover {
    cursor: pointer;
  }

  @media ${devices.tablet} {
    display: flex;
  }
`;

const DimDiv = styled.div`
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.Dim};
  position: fixed;
  top: 0;
  left: 0;
`;

const ContentsBox = styled.div`
  padding: 24px;
  width: 327px;
  height: 568px;
  flex-shrink: 0;

  border: none;
  ${boxStyles.radius24};
  background: ${colors.gray10};
  ${boxStyles.shadow3};

  @media ${devices.tablet} {
    padding: 40px;
    width: 612px;
    height: 454px;
  }
`;

const CloseButton = styled.button`
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border: none;
  background: ${colors.gray10};

  img {
    width: 22px;
    height: 22px;
  }

  &: hover {
    cursor: pointer;
  }

  @media ${devices.tablet} {
    width: 28px;
    height: 28px;

    img {
      width: 28px;
      height: 28px;
    }
  }
`;

const FlexDiv = styled.div`
  display: flex;
  width: 279px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  @media ${devices.tablet} {
    width: 532px;
  }
`;

const FlexMessageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  color: ${colors.gray60};
  ${fontStyles.regular};
  ${fontStyles.body1};

  img {
    width: 28px;
    height: 28px;
  }

  @media ${devices.tablet} {
    ${fontStyles.h3};
  }
`;

export default Modalsection;
