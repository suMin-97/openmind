import { useState } from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
  // 임시 로그인으로 피드, 답변 페이지에 ID 값 부여함, 메인 페이지 제작 되면 삭제 요망
  const [id, setId] = useState(0);

  return (
    <div>
      <form>
        <label>
          ID 값 넣어!!!!!!!!
          <input type="number" />
        </label>
        <button
          onClick={(event) => {
            event.preventDefault();
            setId(event.target.form[0].value);
          }}
        >
          입력
        </button>
      </form>
      <h1>메인 페이지</h1>
      <Link to="/list">리스트 페이지</Link>
      <Link to={`/post/${id}`}>피드 페이지</Link>
      <Link to={`/post/${id}/answer`}>답변 페이지</Link>
    </div>
  );
};

export default MainPage;
