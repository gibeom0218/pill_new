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

    const randomTodoList = randomTodos.map((todo) => ({
      text: todo,
      morning: false,
      lunch: false,
      dinner: false,
    }));

    setTodoList(randomTodoList);
  };

  const toggleTodo = (index, time) => {
    const updatedTodoList = [...todoList];
    updatedTodoList[index][time] = !updatedTodoList[index][time];
    setTodoList(updatedTodoList);
  };

  const formatKoreanDate = (date) => {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSaveClick = () => {
    // 이곳에 저장 로직을 추가
    alert('저장되었습니다.'); // 예시 메시지
  };

  return (
    <div className="calendar-container">
      <div className="calendar">
        <Calendar onChange={onChange} value={date} className="custom-calendar" />
      </div>
      <div className="todo-list">
        <h2>체크리스트</h2>
        <ul>
          {todoList.map((todo, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={todo.morning}
                onChange={() => toggleTodo(index, 'morning')}
              />
              <span className={todo.morning ? 'completed' : ''}>아침</span>
              <input
                type="checkbox"
                checked={todo.lunch}
                onChange={() => toggleTodo(index, 'lunch')}
              />
              <span className={todo.lunch ? 'completed' : ''}>점심</span>
              <input
                type="checkbox"
                checked={todo.dinner}
                onChange={() => toggleTodo(index, 'dinner')}
              />
              <span className={todo.dinner ? 'completed' : ''}>저녁</span>
              {todo.text}
            </li>
          ))}
        </ul>
        <p className="small-date">
          날짜: {formatKoreanDate(date)}
        </p>
        <button className="save-button" onClick={handleSaveClick}>
          저장
        </button>
      </div>
    </div>
  );
}

export default MyCalendar;
