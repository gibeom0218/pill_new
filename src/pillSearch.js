import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const PillSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // 약 이름 검색을 위한 입력 필드의 값을 저장
  const [searchResults, setSearchResults] = useState([]); // 검색된 약 리스트를 저장
  const [registerStatus, setRegisterStatus] = useState(''); //약 등록 상태를 저장

  const handleSearchTermChange = (event) => { //약 이름 검색 입력 필드의 변경을 감지하고, searchTerm 상태를 업데이트.
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event) => { //검색 버튼을 클릭하면 호출되는 함수로, Axios를 사용하여 서버에 약 검색 요청을 보냄.
    event.preventDefault(); //서버에 GET 요청을 보내고, 검색된 약 리스트를 searchResults 상태로 업데이트합니다.

    try {
      const response = await axios.get(`/pillSearch?pillName=${searchTerm}`);
      const { success, pillList, errorMessage } = response.data;

      if (success) {
        setSearchResults(pillList);
      } else {
        console.error('Search failed:', errorMessage);
      }
    } catch (error) {
      console.error('Search failed:', error.message);
    }
  };

  const handleRegister = async (pillCode) => { // 약을 등록하기 위해 호출되는 함수로, 약을 선택하고 "등록" 버튼을 클릭하면 호출.
    const data = { //서버에 POST 요청을 보내고, 약 등록 상태를 registerStatus 상태로 업데이트.
      id: 'example_id', // Example: Replace with actual user ID
      pillCode,
    };

    try {
      const response = await axios.post('/pillEnroll', data);
      const { success, successMessage, errorMessage } = response.data;

      if (success) {
        setRegisterStatus(`Success: ${successMessage}`);
      } else {
        setRegisterStatus(`Failure: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      setRegisterStatus('Failure: An error occurred during registration.');
    }
  };

  return (
    <div>
      <Typography variant="h4">약 검색 및 등록 페이지</Typography>

      <div>
        <Typography variant="h5">약 검색</Typography>
        <form onSubmit={handleSearch}>
          <TextField
            label="약 이름 검색"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
          <Button variant="contained" color="primary" type="submit">
            검색
          </Button>
        </form>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Typography variant="h5">검색된 약 리스트</Typography>
        <List>     
          {searchResults.map((pill, index) => (
            <ListItem key={index}>
              <ListItemButton onClick={() => handleRegister(pill.pillCode)}>
                <ListItemText primary={pill.pillName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Typography variant="h5">등록 상태</Typography>
        <Typography>{registerStatus}</Typography>
      </div>
    </div>
  );
};

export default PillSearchPage;

/*Axios를 사용하여 HTTP 요청을 보내고, 서버로부터 응답을 받음.
 검색 및 등록 요청에 대한 응답을 처리하고 상태를 업데이트.
이 컴포넌트는 약 검색, 약 등록, 그리고 관련된 상태 및 이벤트 처리를 통합하여 약 검색 및 등록 페이지를 구성. 
사용자가 검색한 약을 선택하여 등록할 수 있도록 UI를 제공. */