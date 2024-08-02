import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../services/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import "../DiaryListByDate.css"; // CSS 파일 import

const emotionIcons = {
  긍정: "😊",
  부정: "😢",
  중립: "😐",
  분노: "😠",
};

const DiaryListByDate = () => {
  const [diaries, setDiaries] = useState([]);
  const { user } = useContext(AuthContext);
  const { date } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiaries = async () => {
      if (user) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;

        try {
          const response = await axiosInstance.get(
            `/api/diaries/date/${date}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          console.log("Fetched diaries:", response.data); // Fetch된 데이터를 확인하기 위한 로그

          setDiaries(response.data);
        } catch (error) {
          console.error("일기 목록 조회 실패:", error);
        }
      }
    };

    fetchDiaries();
  }, [user, date]);

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
    <div className="diary-detail-container2">
      <br></br>
      <h1 className="diary-detail-title">
        <br></br>
        {new Date(date).toLocaleDateString()}의 일기 목록
      </h1>
      {diaries.length > 0 ? (
        <ul className="diary-detail-list">
          {diaries.map((diary) => (
            <li
              key={diary.id}
              className="diary-detail-list-item"
              onClick={() => navigate(`/diaries/${diary.id}`)}
            >
              <h2>{diary.title}</h2>
              <p>{diary.content}</p>
              <p>
                감정: {diary.emotion} {emotionIcons[diary.emotion]}
              </p>
              {diary.image && (
                <img
                  src={`data:image/jpeg;base64,${diary.image}`}
                  alt="Diary"
                  className="diary-image"
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>작성된 일기가 없습니다.</p>
      )}
      <div className="button-container">
        <button onClick={handleCreateDiaryClick} className="home-button2">
          새 일기 작성하기
        </button>
        <button onClick={handleDiaryListClick} className="home-button2">
          일기 목록으로
        </button>
      </div>
      <div className="center-button">
        <button onClick={handleHomeClick} className="home-button2">
          홈으로
        </button>
      </div>
    </div>
  );
};

export default DiaryListByDate;
