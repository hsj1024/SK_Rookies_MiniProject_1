import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../services/axiosConfig";
import { AuthContext } from "../context/AuthContext";

const DiaryList = () => {
  const [diaries, setDiaries] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchDiaries = async () => {
      if (user && user.id) {
        try {
          const response = await axiosInstance.get("/api/diaries", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setDiaries(response.data);
        } catch (error) {
          console.error("일기 목록 조회 실패:", error);
        }
      } else {
        console.warn("사용자 정보가 없습니다.");
      }
    };

    fetchDiaries();
  }, [user]);

  return (
    <div>
      <h1>일기 목록</h1>
      {diaries.length > 0 ? (
        <ul>
          {diaries.map((diary) => (
            <li key={diary.id}>
              <h2>{diary.title}</h2>
              <p>{diary.content}</p>
              <p>감정: {diary.emotion}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>작성된 일기가 없습니다.</p>
      )}
    </div>
  );
};

export default DiaryList;
