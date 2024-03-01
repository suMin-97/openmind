import { useState, useRef } from "react";
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
  background-color: white;
`;

const Modal = ({ onClick }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const ModalBg = useRef();

  const handleBGCloseClick = (event) => {
    if (event.target === ModalBg.current) {
      onClick(false);
    }
  };

  const handleBtnCloseClick = () => {
    onClick(false);
  };

  const handleChange = (event) => {
    if (event.target.value !== "") {
      setIsDisabled(false);
    }
  };

  const handleBlur = (event) => {
    if (event.target.value === "") {
      setIsDisabled(true);
    }
  };

  return (
    <ContainDiv ref={ModalBg} onClick={handleBGCloseClick}>
      <ContentsBox>
        <button onClick={handleBtnCloseClick}>X</button>
        <form>
          <h1>질문을 작성하세요</h1>
          <label htmlFor="question">
            To.아초 is cat <br />
            <input
              id="question"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </label>
          <button disabled={isDisabled} type="submit">
            질문 보내렴
          </button>
        </form>
      </ContentsBox>
    </ContainDiv>
  );
};

const Modalsection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button onClick={handleOpenClick}>질문하실?</button>
      {isModalOpen && <Modal onClick={setIsModalOpen} />}
    </>
  );
};

export default Modalsection;
