import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { registerDrug } from './api'; // API 함수를 가져옴 (약 등록)

const AddDrugForm = () => {
  const [drugName, setDrugName] = useState(''); // 약 이름 상태

  const handleDrugNameChange = (event) => {
    setDrugName(event.target.value); // 약 이름 변경 핸들러
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 기본 동작 방지

    // API를 호출하여 약 등록
    registerDrug(drugName)
      .then((response) => {
        // 등록 성공 처리 (여기서 커스터마이징 가능)
        console.log('약이 성공적으로 등록되었습니다:', response.data);
      })
      .catch((error) => {
        // 등록 실패 처리 (여기서 커스터마이징 가능)
        console.error('약 등록 중 오류 발생:', error);
      });
  };

  return (
    <div>
      <Typography variant="h4">약 등록</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="약 이름"
          variant="outlined"
          value={drugName}
          onChange={handleDrugNameChange}
        />
        <Button variant="contained" color="primary" type="submit">
          약 등록
        </Button>
      </form>
    </div>
  );
};

export default AddDrugForm;