import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const PillSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [registerStatus, setRegisterStatus] = useState('');

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.get(`http://110.12.181.206:8081/pillSearch?pillName=${searchTerm}`);
      console.log('Server Response:', response.data);
      const { success, pillList, errorMessage } = response.data;
      setSearchResults(pillList);
  
      if (success) {
        setSearchResults(pillList); // Set the pillList directly
      } else {
        console.error('Search failed:', errorMessage);
      }
    } catch (error) {
      console.error('Search failed:', error.message);
    }
  };

  const handleRegister = async (pillCode) => {
    const data = {
      id: 'example_id',
      pillCode,
    };

    try {
      const response = await axios.post('http://110.12.181.206:8081/pillSearch', data);
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
              <ListItemText
                primary={pill.pillName}
                secondary={`약 코드: ${pill.pillCode}`}
              />
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