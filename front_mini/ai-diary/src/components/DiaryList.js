import React, { useEffect, useState, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axiosInstance from "../services/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../fonts/DungGeunMo.ttf";
import "../fonts/EF_Diary.ttf";
import Navbar from "./NavBar";

const DiaryList = () => {
  const [diaries, setDiaries] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchDiaries = async () => {
      if (user) {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const token = storedUser?.token;

        try {
          const response = await axiosInstance.get("/api/diaries", {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Fetched Diaries: ", response.data); // Fetch된 데이터를 확인하기 위한 로그
          setDiaries(response.data);
        } catch (error) {
          console.error("일기 목록 조회 실패:", error);
          alert("일기 목록 조회에 실패했습니다. 다시 시도해주세요."); // 에러 발생 시 알림 표시
        }
      }
    };

    fetchDiaries();
  }, [user]);

  const handleDateClick = (date) => {
    const formattedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split("T")[0];
    navigate(`/diaries/date/${formattedDate}`);
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    setCurrentMonth(activeStartDate.getMonth());
    setCurrentYear(activeStartDate.getFullYear());
  };

  return (
    <>
      <Navbar />
      <StyledDiaryListContainer>
        <StyledTitle>Diary Calendar</StyledTitle>
        <StyledCalendarWrapper>
          <StyledCalendar
            onClickDay={handleDateClick}
            onActiveStartDateChange={handleActiveStartDateChange}
            tileContent={({ date, view }) => {
              if (view === "month") {
                const dayDiaries = diaries.filter(
                  (diary) =>
                    new Date(diary.createdAt).toDateString() ===
                    date.toDateString()
                );
                if (dayDiaries.length > 0) {
                  return <StyledDot />;
                }
              }
            }}
            tileClassName={({ date, view }) => {
              const isWeekend = date.getDay() === 6 || date.getDay() === 0;
              const calendarMonth = date.getMonth();
              const calendarYear = date.getFullYear();
              const isCurrentMonth =
                calendarMonth === currentMonth && calendarYear === currentYear;
              const isToday = date.toDateString() === new Date().toDateString();

              if (view === "month" && isToday) {
                return "current-day";
              } else if (view === "month" && isWeekend && !isCurrentMonth) {
                return "weekend-neighboring-month";
              } else if (view === "month" && isWeekend && isCurrentMonth) {
                return "weekend-day";
              } else if (view === "month" && !isCurrentMonth) {
                return "neighboring-month";
              }
              return "month-day";
            }}
          />
        </StyledCalendarWrapper>
      </StyledDiaryListContainer>
    </>
  );
};

export default DiaryList;

const StyledDiaryListContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: "EF_Diary", Arial, sans-serif;
  background-color: #fdd7e4;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTitle = styled.h1`
  text-align: center;
  color: #333;
  font-size: 2em;
  margin-bottom: 20px;
  font-family: "EF_Diary", Arial, sans-serif;
`;

const StyledCalendarWrapper = styled.div`
  width: 100%;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  background-color: #ffffff;
  font-family: "EF_Diary", Arial, sans-serif;

  .react-calendar__navigation {
    background: #ffe4e1; /* 배경색 변경 */
    border-bottom: 2px solid #dcdcdc;
    height: 50px;
    border-radius: 10px 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    color: #333;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */

    span {
      font-size: 24px;
      font-weight: 600;
      font-family: "EF_Diary", Arial, sans-serif;
      color: #333; /* 텍스트 색상 조정 */
    }
    /* 화살표 크기 및 위치 조정 */
    .react-calendar__navigation button {
      background: none;
      border: none;
      color: #333;
      font-size: 16px; /* 화살표 크기 줄이기 */
      cursor: pointer;
      margin: 0 5px; /* 좌우 여백 추가 */

      &:hover,
      &:focus {
        color: #d2691e;
      }

      &:disabled {
        color: #ccc;
      }
    }
    /* 연도 범위의 레이아웃 조정 */
    .react-calendar__navigation span {
      font-size: 18px; /* 텍스트 크기 조정 */
      font-weight: 600;
      font-family: "EF_Diary", Arial, sans-serif;
      color: #333; /* 텍스트 색상 조정 */
      white-space: nowrap; /* 텍스트 줄바꿈 방지 */
      text-align: center; /* 텍스트 가운데 정렬 */
      flex-grow: 1; /* 남은 공간을 차지하도록 */
    }

    .react-calendar__navigation__label {
      display: flex;
      align-items: center;
      justify-content: center; /* 텍스트를 가운데로 정렬 */
      flex-grow: 1; /* 남은 공간을 차지하도록 */
    }

    button {
      background: none;
      border: none;
      color: #333;
      font-size: 24px;
      cursor: pointer;

      &:hover,
      &:focus {
        color: #d2691e;
      }

      &:disabled {
        color: #ccc;
      }
    }
  }

  .react-calendar__month-view__weekdays {
    display: flex;
    justify-content: space-around;
    text-align: center;
    font-weight: bold;
    border-bottom: 1px solid #dcdcdc;
    background-color: #ffefd5; /* 배경색 변경 */

    abbr {
      font-size: 14px;
      font-weight: 900;
      color: #333;
    }
  }

  .react-calendar__month-view__days {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: #fffafa; /* 배경색 변경 */
  }

  .react-calendar__tile {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 14px;
    border-radius: 10px;
    position: relative;
    outline: none;
    border: 1px solid transparent;

    &:hover,
    &:focus {
      background: pink;
      border-color: #dcdcdc;
    }

    &.current-day {
      background: #90ee90;
      color: white;
    }

    &.weekend-day {
      color: #d10000;
    }

    &.weekend-neighboring-month {
      color: rgba(209, 0, 0, 0.5); /* 흐릿한 빨간색 */
    }

    &.neighboring-month {
      color: rgba(0, 0, 0, 0.3); /* 흐릿한 검정색 */
    }

    &.month-day {
      color: black;
    }
  }

  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 20px;
    padding: 20px;
    justify-content: center;
    background-color: #fffafa; /* 배경색 변경 */

    .react-calendar__tile {
      height: 60px; /* 높이를 줄여 정사각형에 가깝게 */
      width: 80px; /* 너비를 줄여 정사각형에 가깝게 */
      padding: 0;
      font-size: 24px;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .react-calendar__tile--active {
    background: #87ceeb;
    color: white;
  }
  // 현재날짜 위치색
  .react-calendar__tile--now {
    background: #fdd7e4;
    border-color: black;
  }
`;

const StyledDot = styled.div`
  height: 8px;
  width: 8px;
  background-color: #ff6961;
  border-radius: 50%;
  display: inline-block;
  margin-top: 5px;
`;
