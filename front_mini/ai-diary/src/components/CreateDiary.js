import React, { useState, useContext } from "react";
import axiosInstance from "../services/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreateDiary = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axiosInstance.post(
        "/api/diaries",
        { title, content, user: { id: user.id } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("일기 작성 성공");
      navigate("/diaries");
    } catch (error) {
      console.error(error);
      alert("일기 작성 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>일기 작성</h1>
      <label>
        제목:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>
      <label>
        내용:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>
      <button type="submit">작성</button>
    </form>
  );
};

export default CreateDiary;
