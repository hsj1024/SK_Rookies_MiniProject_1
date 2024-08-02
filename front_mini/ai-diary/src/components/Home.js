import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "../Home.css";
import homeImage from "../images/homeImage.png"; // 이미지를 추가한 경로에 맞게 변경

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <Layout>
      <img className="home-background" src={homeImage} alt="Home Background" />
      <div className="logo-container">
        <h1 className="logo-title">마음기록 AI 감성 일기 📒</h1>
      </div>
      <div className="home-container">
        <h1 className="home-title">
          감성일기에 오신걸 환영합니다 {user ? user.userId : "Guest"} 님 !❤️‍🩹
        </h1>
        {user ? (
          <div className="button-container">
            <Link className="styled-link" to="/create-diary">
              일기 작성하기
            </Link>
            <Link className="styled-link" to="/diaries">
              작성한 일기 목록 조회
            </Link>
          </div>
        ) : (
          <div className="button-container">
            <Link className="styled-link" to="/signup">
              회원 가입
            </Link>
            <Link className="styled-link" to="/login">
              로그인
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
