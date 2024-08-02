// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateDiary from "./components/CreateDiary";
import DiaryList from "./components/DiaryList";
import DiaryDetail from "./components/DiaryDetail";
import DiaryListByDate from "./components/DiaryListByDate"; // 날짜별 일기 목록 컴포넌트
import Search from "./components/Search";
import SearchResults from "./components/SearchResults";
import { AuthProvider } from "./context/AuthContext";
import FindUsername from "./components/FindUsername";
import FindPassword from "./components/FindPassword"; // FindPassword 컴포넌트 추가
import MyPage from "./components/MyPage";
// import ResetPasswordRequest from "./components/ResetPasswordRequest";
// import ResetPassword from "./components/ResetPassword";
import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-diary" element={<CreateDiary />} />
          <Route path="/diaries" element={<DiaryList />} />
          <Route path="/diaries/:id" element={<DiaryDetail />} />
          <Route
            path="/diaries/date/:date"
            element={<DiaryListByDate />}
          />{" "}
          {/* 날짜별 일기 목록 경로 */}
          <Route path="/search" element={<Search />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/mypage" element={<MyPage />} /> {/* 추가 */}
          <Route path="/find-username" element={<FindUsername />} />
          <Route path="/find-password" element={<FindPassword />} />{" "}
          {/* FindPassword 경로 추가 */}
          {/* <Route
            path="/reset-password-request"
            element={<ResetPasswordRequest />}
          />
          <Route path="/reset-password" element={<ResetPassword />} /> */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
