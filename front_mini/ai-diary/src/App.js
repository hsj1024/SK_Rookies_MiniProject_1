import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateDiary from "./components/CreateDiary";
import DiaryList from "./components/DiaryList";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-diary" element={<CreateDiary />} />
          <Route path="/diaries" element={<DiaryList />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
