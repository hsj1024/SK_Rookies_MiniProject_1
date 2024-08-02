import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axiosInstance from "../services/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../CalendarView.css";

const CalendarView = () => {
  const [diaries, setDiaries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const onDateClick = (date) => {
    setSelectedDate(date);
    const selectedDiaries = diaries.filter(
      (diary) =>
        new Date(diary.createdAt).toDateString() === date.toDateString()
    );
    if (selectedDiaries.length > 0) {
      navigate(`/diaries/date/${date.toISOString()}`);
    } else {
      alert("해당 날짜에 작성된 일기가 없습니다.");
    }
  };

  return (
    <div>
      <h1>일기 캘린더</h1>
      <Calendar
        onClickDay={onDateClick}
        value={selectedDate}
        tileContent={({ date }) => {
          const dayDiaries = diaries.filter(
            (diary) =>
              new Date(diary.createdAt).toDateString() === date.toDateString()
          );
          return dayDiaries.length > 0 ? <span>📅</span> : null;
        }}
      />
    </div>
  );
};

export default CalendarView;
