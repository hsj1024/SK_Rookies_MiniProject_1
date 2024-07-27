import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const credentials = {
      username: usernameOrEmail,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        credentials
      );

      login(response.data); // 로그인 성공 시 login 함수 호출
    } catch (error) {
      console.error(
        "An error occurred:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username or Email:
        <input
          type="text"
          value={usernameOrEmail}
          onChange={(e) => setUsernameOrEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
