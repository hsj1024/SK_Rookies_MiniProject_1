// Signup.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signup", {
        username,
        password,
        email,
      });
      alert("회원가입 성공");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("회원가입 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>회원가입</h1>
      <label>
        사용자 이름:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        비밀번호:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        이메일:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <button type="submit">회원가입</button>
    </form>
  );
};

export default Signup;
