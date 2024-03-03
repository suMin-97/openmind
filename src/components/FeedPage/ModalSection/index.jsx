import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import useRequest from "../../../hooks/useRequest";

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
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    data: profileData,
    error: profileError,
    isLoading: profileIsLoading,
    request: getRequest,
  } = useRequest({
    url: `subjects/${subjectId}`,
    method: "GET",
  });
  const modalBg = useRef();

  const handleBGCloseClick = (event) => {
    if (event.target === modalBg.current) {
      setIsModalOpen(false);
    }
  };

  const handleBtnCloseClick = () => {
    setIsModalOpen(false);
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

  useEffect(() => {
    getRequest();
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <ContainDiv ref={modalBg} onClick={handleBGCloseClick}>
      <ContentsBox>
        <button onClick={handleBtnCloseClick}>X</button>
        <form>
          <h1>질문을 작성하세요</h1>
          <label htmlFor="question">
            {profileIsLoading && <p>로딩중</p>}
            {profileData && (
              <>
                <img src={profileData?.imageSource} />
                <p>{profileData?.name}</p>
              </>
            )}
            {profileError && <p>삐빅 에러 입니다</p>}
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
