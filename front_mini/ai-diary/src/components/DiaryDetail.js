import React, { useState, useEffect } from "react";
import axios from "../services/axiosConfig"; // 경로에 맞게 import
import { useParams } from "react-router-dom";

const DiaryDetail = () => {
  const { id } = useParams();
  const [diary, setDiary] = useState(null);

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await axios.get(`/api/auth/diaries/${id}`);
        setDiary(response.data);
      } catch (error) {
        console.error(error);
        alert("일기 내용을 불러오는 데 실패했습니다.");
      }
    };
    fetchDiary();
  }, [id]);

  if (!diary) {
    return <div>일기 내용을 불러오는 중...</div>;
  }

  return (
    <div>
      <h1>{diary.title}</h1>
      <p>{diary.content}</p>
      <p>작성 날짜: {new Date(diary.createdAt).toLocaleString()}</p>
      <p>감정 분석 결과: {diary.emotion}</p>
    </div>
  );
};

export default DiaryDetail;
