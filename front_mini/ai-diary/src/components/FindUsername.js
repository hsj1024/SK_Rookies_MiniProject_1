import React, { useState } from "react";
import axios from "axios";
import "../FindUsername.css";

const FindUsername = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/find-username",
        { email, name }
      );
      console.log(response.data); // 응답 데이터 확인
      setUsername(response.data);
      setIsSubmitted(true);
    } catch (error) {
      alert(error.response.data);
      console.error(
        "An error occurred:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="find-username-container">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="find-username-form">
          <h1>아이디 찾기</h1>
          <label>
            이메일:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            이름:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <button type="submit">아이디 찾기</button>
        </form>
      ) : (
        <div className="result-container">
          <h2>아이디 찾기 결과</h2>
          <p>아이디: {username}</p>
          <button onClick={() => (window.location.href = "/login")}>
            확인
          </button>
        </div>
      )}
    </div>
  );
};

export default FindUsername;
