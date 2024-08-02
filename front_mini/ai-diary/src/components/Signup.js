import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../Signup.css";

const Signup = () => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState(""); // 추가된 name 상태
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signup", {
        userId,
        username,
        password,
        email,
        name, // 요청에 name 추가
      });
      alert("회원가입 성공");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert(error.response.data);
      } else {
        alert("회원가입 실패");
      }
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-logo">AI 감성일기</div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          아이디 :
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </label>
        <label>
          비밀번호 :
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          이메일 :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          이름 :
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
