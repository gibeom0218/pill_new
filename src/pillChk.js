import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './pillChk.css';

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [todoList, setTodoList] = useState([]);

  const onChange = (newDate) => {
    setDate(newDate);

    // 랜덤 To-Do 항목 생성 (예제 데이터)
    const randomTodos = [
      '약 복용하기',
      '스케줄 확인',
      '회의 참석',
      '운동하기',
      '쇼핑 가기',
    ];

    const randomTodoList = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * randomTodos.length);
      randomTodoList.push(randomTodos[randomIndex]);
    }

    setTodoList(randomTodoList);
  };

  // 날짜를 한글로 변환하는 함수
  const formatKoreanDate = (date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <Calendar
          onChange={onChange}
          value={date}
          className="custom-calendar"
        />
      </div>
      <div className="todo-list">
        <h2>{formatKoreanDate(date)} 체크리스트</h2>
        <ul>
          {todoList.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MyCalendar;
