import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import GlobalFont from "./styles/fonts/fonts";
import MainPage from "./Pages/MainPage";
import QuestionListPage from "./Pages/QuestionListPage";
import FeedPage from "./Pages/FeedPage";
import AnswerPage from "./Pages/AnswerPage";
import NoPage from "./Pages/NoPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <GlobalFont />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="list" element={<QuestionListPage />} />
        <Route path="post/:id">
          <Route index element={<FeedPage />} />
          <Route path="answer" element={<AnswerPage />} />
        </Route>
        <Route path="/not-found" element={<NoPage />} />
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
