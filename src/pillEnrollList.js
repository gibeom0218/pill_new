import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { Image, Delete } from '@mui/icons-material';

function PillList() {
  const [pillData, setPillData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Axios를 사용하여 데이터 가져오기
    axios
      .get('http://110.12.181.206:8081/pillEnrollList')
      .then((response) => {
        setPillData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (index) => {
    // 삭제 요청을 보내고, 성공하면 해당 항목을 제거
    axios
      .delete(`http://110.12.181.206:8081/deletePill/${pillData[index].pillCode}`)
      .then(() => {
        const updatedPillData = [...pillData];
        updatedPillData.splice(index, 1);
        setPillData(updatedPillData);
      })
      .catch((error) => {
        console.error('Error deleting pill:', error);
      });
  };

  const openImageInNewWindow = (image) => {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`<html><body><img src="${image}" /></body></html>`); //이미지를 클릭했을때 새창이 띄워지는 코드
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        나만의 약 등록 리스트
      </Typography>
      <List>
        {pillData.pillList.map((pill, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>
                {pill.itemImage ? (
                  <img
                    src={pill.itemImage}
                    alt={pill.pillName}
                    style={{ width: '100%', height: '100%' }}
                    onClick={() => openImageInNewWindow(pill.itemImage)}
                  />
                ) : (
                  <Image />
                )}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={pill.pillName} secondary={`약 코드: ${pill.pillCode}`} />
            <IconButton onClick={() => handleDelete(index)} aria-label="delete">
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default PillList;
