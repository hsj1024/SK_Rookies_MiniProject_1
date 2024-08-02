import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../components/Layout"; // Layout 컴포넌트를 추가
import "../Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [userIdOrEmail, setUserIdOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const credentials = {
      userId: userIdOrEmail,
      email: userIdOrEmail,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        credentials
      );

      login(response.data);
      navigate("/");
    } catch (error) {
      console.error(
        "An error occurred:",
        error.response ? error.response.data : error.message
      );

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (error.response.data.message.includes("사용자를 찾을 수 없습니다")) {
          toast.error("아이디 또는 이메일이 일치하지 않습니다.");
        } else if (
          error.response.data.message.includes("비밀번호가 일치하지 않습니다")
        ) {
          toast.error("비밀번호가 일치하지 않습니다.");
        } else {
          toast.error("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        toast.error("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <Layout>
      <div className="login-container">
        <div className="login-logo">AI 감성일기</div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            아이디 또는 이메일:
            <input
              type="text"
              value={userIdOrEmail}
              onChange={(e) => setUserIdOrEmail(e.target.value)}
              required
            />
          </label>
          <label>
            비밀 번호:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
        <div className="additional-buttons">
          <button
            type="button"
            onClick={() => (window.location.href = "/find-username")}
          >
            아이디 찾기
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = "/find-password")}
          >
            비밀번호 찾기
          </button>
          <button
            type="button"
            onClick={() => (window.location.href = "/signup")}
          >
            회원 가입
          </button>
        </div>
        <ToastContainer />
      </div>
    </Layout>
  );
};

export default Login;
