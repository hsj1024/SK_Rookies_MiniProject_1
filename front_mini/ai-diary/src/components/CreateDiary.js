import React, { useState, useContext, useEffect } from "react";
import axiosInstance from "../services/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../CreateDiary.css";

const CreateDiary = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [date, setDate] = useState(""); // 초기 값을 빈 문자열로 설정

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setDate(today); // 컴포넌트가 마운트될 때 오늘 날짜를 설정
  }, []);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag.length > 1 && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput(""); // 입력 필드 비우기
      }
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(tags)); // 태그 배열을 JSON 문자열로 변환
    formData.append("createdAt", new Date(date).toISOString());

    if (image) {
      formData.append("image", image);
    }

    try {
      // 일기 생성 API 호출
      const response = await axiosInstance.post("/api/diaries", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("일기 작성 성공");
      navigate("/diaries");
    } catch (error) {
      console.error(error);
      alert("일기 작성 실패");
    }
  };

  return (
    <div className="create-diary-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate(-1)}>
          뒤로가기
        </button>
        <h1 className="title">새로운 일기 쓰기</h1>
      </div>
      <br></br>
      <form onSubmit={handleSubmit} className="create-diary-form">
        <label>
          오늘은 언제인가요?
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
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
        <label>
          이미지:
          <input type="file" onChange={handleImageChange} />
        </label>
        <label>
          태그:
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="태그를 입력하고 엔터를 누르세요"
          />
        </label>
        <div className="tag-list">
          {tags.map((tag, index) => (
            <div key={index} className="tag-item">
              {tag}
              <button type="button" onClick={() => handleTagRemove(tag)}>
                &times;
              </button>
            </div>
          ))}
        </div>
        <div className="buttons">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(-1)}
          >
            취소하기
          </button>
          <button type="submit" className="submit-button">
            작성완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDiary;
