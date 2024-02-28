import { useState } from "react";
import styled from "styled-components";

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
  color: white;
`;

function Modal({ onClick }) {
  return (
    <ContainDiv>
      <ContentsBox>
        모달이당
        <button onClick={onClick} type="button">
          X
        </button>
      </ContentsBox>
    </ContainDiv>
  );
}

function Modalsection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button onClick={handleButtonClick} type="button">
        질문하실?
      </button>
      {isModalOpen ? <Modal onClick={handleButtonClick} /> : null}
    </>
  );
}

export default Modalsection;
