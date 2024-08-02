import React from "react";
import { useNavigate } from "react-router-dom";
import "../Navigation.css"; // 네비게이션 바의 스타일을 위한 CSS 파일

const Navigation = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleCreateDiaryClick = () => {
    navigate("/create-diary");
  };

  const handleDiaryListClick = () => {
    navigate("/diaries");
  };

  return (
    <nav className="navigation">
      <div className="logo" onClick={handleHomeClick}>
        MyDiaryApp
      </div>
      <ul className="nav-links">
        <li onClick={handleHomeClick}>Home</li>
        <li onClick={handleCreateDiaryClick}>New Diary</li>
        <li onClick={handleDiaryListClick}>Diary List</li>
      </ul>
    </nav>
  );
};

export default Navigation;
