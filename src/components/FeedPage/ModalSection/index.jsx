import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ModalForm from "../ModalForm";

const ContainDiv = styled.div`
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--Dim, rgba(0, 0, 0, 0.5));
  position: fixed;
  top: 0;
  left: 0;
`;

const ContentsBox = styled.div`
  width: 500px;
  height: 400px;
  border: 5px solid white;
  background-color: white;
`;

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
    <ContainDiv ref={modalBg} onClick={handleBGCloseClick}>
      <ContentsBox>
        <button onClick={handleBtnCloseClick}>X</button>
        <h1>질문을 작성하세요</h1>
        <ModalForm setIsModalOpen={setIsModalOpen} subjectId={subjectId} />
      </ContentsBox>
    </ContainDiv>
  );
};

const Modalsection = ({ subjectId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button onClick={handleOpenClick}>질문하실?</button>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen} subjectId={subjectId} />
      )}
    </>
  );
};

export default Modalsection;
