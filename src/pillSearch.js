import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, List, ListItem, ListItemText, Grid } from '@mui/material';

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
      const { success, pillList, errorMessage } = response.data;
      setSearchResults(pillList);
  
      if (!success) {
        console.error('Search failed:', errorMessage);
        setRegisterStatus('검색에 실패했습니다.');
      }
    } catch (error) {
      console.error('Search failed:', error.message);
      setRegisterStatus('검색에 실패했습니다.');
    }
  };

  const handleViewPillSpec = (pillCode) => {
    const url = `/pillSpec/${pillCode}`;
    window.open(url, '_blank');
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
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', border: '1px solid #ccc' }}>
      <Typography variant="h4" gutterBottom>
        약 검색 및 등록 페이지
      </Typography>

      <div>       
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
              <Grid container justifyContent="space-between">
                <Grid item>
                  <ListItemText
                    primary={pill.pillName}
                    secondary={`약 코드: ${pill.pillCode}`}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewPillSpec(pill.pillCode)}
                  >
                    약 정보
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleRegister(pill.pillCode)}
                  >
                    등록
                  </Button>
                </Grid>
              </Grid>
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