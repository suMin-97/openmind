import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import GlobalFont from "./styles/fonts/fonts";
import MainPage from "./Pages/MainPage";
import QuestionListPage from "./Pages/QuestionListPage";
import FeedPage from "./Pages/FeedPage";
import AnswerPage from "./Pages/AnswerPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <GlobalFont />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="list" element={<QuestionListPage />} />
        <Route path="post/1">
          <Route index element={<FeedPage />} />
          <Route path="answer" element={<AnswerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
