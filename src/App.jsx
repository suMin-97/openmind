import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import GlobalFont from "./styles/fonts/fonts";
import QuestionListPage from "./Pages/QuestionListPage";

function App() {
  return (
    <div>
      <GlobalStyle />
      <GlobalFont />
      <QuestionListPage />
    </div>
  );
}

export default App;
