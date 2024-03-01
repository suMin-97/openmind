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

const Modal = ({ subjectId, searchParams, setSearchParams }) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    data: profileData,
    error,
    isLoading,
    request: getRequest,
  } = useRequest({
    url: `subjects/${subjectId}`,
    method: "GET",
  });
  const ModalBg = useRef();

  const handleBGCloseClick = (event) => {
    if (event.target === ModalBg.current) {
      searchParams.delete("isModal");
      setSearchParams(searchParams);
    }
  };

  const handleBtnCloseClick = () => {
    searchParams.delete("isModal");
    setSearchParams(searchParams);
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
    <ContainDiv ref={ModalBg} onClick={handleBGCloseClick}>
      <ContentsBox>
        <button onClick={handleBtnCloseClick}>X</button>
        <form>
          <h1>질문을 작성하세요</h1>
          <label htmlFor="question">
            {isLoading && <p>로딩중</p>}
            {profileData && (
              <>
                <img src={profileData?.imageSource} />
                <p>{profileData?.name}</p>
              </>
            )}
            {error && <p>삐빅 에러 입니다</p>}
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

const Modalsection = ({ subjectId, searchParams, setSearchParams }) => {
  const isModalOpen = searchParams.get("isModal") === "open";

  const handleOpenClick = () => {
    searchParams.set("isModal", "open");
    setSearchParams(searchParams);
  };

  return (
    <>
      <button onClick={handleOpenClick}>질문하실?</button>
      {isModalOpen && (
        <Modal
          subjectId={subjectId}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      )}
    </>
  );
};

export default Modalsection;
