import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../NavBar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [navbarVisible, setNavbarVisible] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
  };

  return (
    <>
      <div className="navbar-toggle" onClick={toggleNavbar}>
        &#9776;
      </div>
      <div className={`navbar ${navbarVisible ? "navbar-visible" : ""}`}>
        <Link to="/">메인 홈</Link>
        {user ? (
          <>
            <Link to="/create-diary">일기 작성하기</Link>
            <Link to="/diaries">내 일기 목록</Link>
            <Link to="/search">태그 찾기</Link>
            <Link to="/mypage">마이 페이지</Link>
            <button className="logout-button" onClick={handleLogout}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link to="/signup">회원 가입</Link>
            <Link to="/login">로그인</Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
