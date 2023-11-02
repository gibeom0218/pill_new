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
        setRegisterStatus('검색에 성공했습니다.');
      }
    } catch (error) {
      console.error('Search failed:', error.message);
      setRegisterStatus('검색에 실패했습니다.');
    }
  };

  const handleViewPillSpec = (itemSeq) => {
    const url = `/pillSpec/${itemSeq}`;
    window.open(url, '_blank');
  };

  const handleRegister = async (ediCode) => {
    const data = {
      id: 'example_id',
      ediCode,
    };

    try {
      const response = await axios.post('http://110.12.181.206:8081/pillEnroll', data);

      if (response.data === 'OK') {
        alert('등록이 완료되었습니다.');
        setRegisterStatus('Success: 등록이 완료되었습니다.');
      } else if (response.data === 'COMBINED') {
        alert('병용 금기 약물 입니다.');
        setRegisterStatus('Failure: 병용 금기 약물 입니다.');
      } else {
        // Handle other responses or errors as needed
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      alert('등록에 실패했습니다.');
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
                    primary={pill.ITEM_NAME}
                    secondary={`약 코드: ${pill.EDI_CODE}`}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewPillSpec(pill.ITEM_SEQ)}
                  >
                    약 정보
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => handleRegister(pill.EDI_CODE)}
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