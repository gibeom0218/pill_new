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
  const [recordOverlay, setRecordOverlay] = useState(false);
  const [selectedPills, setSelectedPills] = useState([]);

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
    // 선택한 약들과 그에 따른 체크박스 상태를 추출합니다.
    const selectedPills = todoList
      .filter((todo) => todo.morning || todo.lunch || todo.dinner)
      .map((todo) => ({
        date: date, // 선택된 날짜 추가
        name: todo.text,
        morning: todo.morning,
        lunch: todo.lunch,
        dinner: todo.dinner,
      }));
  
    // 선택한 약들과 체크박스 상태를 콘솔에 기록합니다.
    console.log('선택한 약:', selectedPills);
  
    // 여기서는 데이터를 백엔드로 전송하거나 필요한 다른 동작을 수행할 수 있습니다.
    // 예를 들어, axios를 사용하여 서버에 POST 요청을 보낼 수 있습니다.
    // 'YOUR_BACKEND_ENDPOINT'를 실제 데이터를 저장하려는 엔드포인트로 교체하세요.
  
    // axios.post('YOUR_BACKEND_ENDPOINT', { selectedPills })
    //   .then((response) => {
    //     console.log('데이터가 성공적으로 저장되었습니다:', response.data);
    //   })
    //   .catch((error) => {
    //     console.error('데이터 저장 중 오류 발생:', error);
    //   });
  
    // 사용자에게 선택한 약이 성공적으로 저장되었음을 나타내는 경고를 표시합니다.
    alert('선택한 약이 저장되었습니다.');
  };

  const handleRecordClick = () => {
    // 복용 기록 오버레이를 표시
    //console.log(232323);
    setRecordOverlay(true);
    // 선택한 약들의 기록을 저장
    setSelectedPills(selectedPills.concat(todoList));
  };

  const closeRecordOverlay = () => {
    // 복용 기록 오버레이를 닫음
    setRecordOverlay(false);
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
        &nbsp;&nbsp;
        <button className="record-button" onClick={handleRecordClick}>
          복용기록
        </button>
      </div>
    </div>
    {recordOverlay && (
        <div className="record-overlay">
          <div className="record-overlay-content">
            <h2>복용 기록</h2>
            <ul>
              {selectedPills.map((pill, index) => (
                <li key={index}>
                  {`${index + 1}. ${pill.text} - 아침: ${pill.morning ? 'O' : 'X'}, 점심: ${pill.lunch ? 'O' : 'X'}, 저녁: ${pill.dinner ? 'O' : 'X'} (${formatKoreanDate(date)})`}
                </li>
              ))}
            </ul>
            <button onClick={closeRecordOverlay}>닫기</button>
          </div>
        </div>
      )}
  </div>
  );
}

export default MyCalendar;
