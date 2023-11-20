import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import {Button, Typography, AppBar, Toolbar, CircularProgress } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // Import the MedicalServicesIcon
import 'react-calendar/dist/Calendar.css';
import './pillChk.css';

function MyCalendar() {
  const [pillData, setPillData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Axios를 사용하여 데이터 가져오기
    axios
      .get('http://110.12.181.206:8081/pillEnrollList', {
        params: {
          id: 'example_id'
        }
      })
      .then((response) => {
        setPillData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const onChange = (newDate) => {
    setDate(newDate);

    // 랜덤 To-Do 항목 생성 (예제 데이터)
    // const randomTodos = [
    //   '약 복용하기',
    //   '스케줄 확인',
    //   '회의 참석',
    //   '운동하기',
    //   '쇼핑 가기',
    // ];

    const updatedTodoList = pillData.pillList.map((pill) => ({
      text: pill.ITEM_NAME,
      morning: false,
      lunch: false,
      dinner: false,
    }));
  
    setTodoList(updatedTodoList);
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

  if (loading) {
    return <CircularProgress/>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
  <div>
    <AppBar position="relative" sx={{ background: '#663399' }}>
        <Toolbar>
          <MedicalServicesIcon sx={{ mr: 4 }} />
          <Typography variant="h4" color="inherit" noWrap fontWeight={'bold'}>
            PillBOX
          </Typography>
          <Button 
            sx={{marginLeft: '150px',fontSize: '18px',fontWeight: 'bold'}}color="inherit" onClick={() => { window.location.href = '/' }}>홈페이지</Button>
          <Button 
            sx={{marginLeft: '150px',fontSize: '18px',fontWeight: 'bold',}}color="inherit" onClick={() => { window.location.href = '/pillSearch' }}>검색 및 등록</Button>
          <Button 
            sx={{marginLeft: '150px',fontSize: '18px',fontWeight: 'bold',}}color="inherit" onClick={() => { window.location.href = '/pillEnrollList' }}>약 목록</Button>
          <Button 
            sx={{marginLeft: '150px',fontSize: '18px',fontWeight: 'bold',}}color="inherit" onClick={() => { window.location.href = '/pillMap' }}>약국 지도</Button>
          <Button 
            sx={{marginLeft: '150px',fontSize: '18px',fontWeight: 'bold',}}color="inherit" onClick={() => { window.location.href = '/pillChk' }}>체크리스트</Button>
          <Button
            variant="contained"
            sx={{
                marginLeft: '280px',
                width: '70px', // 원하는 너비
                height: '30px',   // 원하는 높이
                fontWeight: 'bold',
                background: '#FFFFFF',
                color :'#000000'
            }}
            onClick={() => {
                // 원하는 링크로 이동
                window.location.href = '/login';
              }}
            >
            LOGIN
        </Button>  
        </Toolbar>
      </AppBar>
    <div className="calendar-container">
      <div className="calendar">
        <Calendar onChange={onChange} value={date} className="custom-calendar" />
      </div>
      <div className="todo-list">
        <h2>체크리스트</h2>
        <ul>
          {todoList.map((todo, index) => (
            <li key={index}>
              {(index+1)+'. ' + todo.text}
              <div className="checkbox-label">
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
              </div>
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
  </div>
  );
}

export default MyCalendar;
