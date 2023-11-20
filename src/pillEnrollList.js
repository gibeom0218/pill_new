import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, IconButton, CircularProgress } from '@mui/material';
import { Button, AppBar, Toolbar } from '@mui/material';
import { Image, Delete, Info } from '@mui/icons-material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // Import the MedicalServicesIcon
import { Link } from 'react-router-dom';

function PillList() {
  const [pillData, setPillData] = useState([]);
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
        setLoading(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (index, ediCode) => {
    // 삭제 요청을 POST로 보내고, 성공하면 해당 항목을 제거
    axios
      .post('http://110.12.181.206:8081/deletePillEnroll', { id: 'example_id', ediCode })
      .then(() => {
        const updatedPillData = [...pillData];
        updatedPillData.splice(index, 1);
        setPillData(updatedPillData);
      })
      .catch((error) => {
        console.error('Error deleting pill:', error);
      });

    window.location.reload();
  };

  const openImageInNewWindow = (image) => {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`<html><body><img src="${image}" /></body></html>`);
  };

  if (loading) {
    return <CircularProgress />;
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
      <br></br>
      <br></br>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        나만의 약 등록 리스트
      </Typography>
      <List style={{ width: '30%' }}>
        {pillData.pillList.map((pill, index) => (
          <ListItem key={index} style={{ margin: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '3px solid #ccc', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ListItemAvatar>
                <Avatar>
                  {pill.ITEM_IMAGE ? (
                    <img
                      src={pill.ITEM_IMAGE}
                      alt={pill.ITEM_NAME}
                      style={{ width: '100%', height: '100%' }}
                      onClick={() => openImageInNewWindow(pill.ITEM_IMAGE)}
                    />
                  ) : (
                    <Image />
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={pill.ITEM_NAME} secondary={`약 코드: ${pill.EDI_CODE}`} />
            </div>

            <div style={{ display: 'flex' }}>
              <Link to={`/pillSpec/${pill.EDI_CODE}`} style={{ textDecoration: 'none' }}>
                <IconButton aria-label="details">
                  <Info />
                </IconButton>
              </Link>

              <IconButton onClick={() => handleDelete(index, pill.EDI_CODE)} aria-label="delete">
                <Delete />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>
     </div>
    </div>
  );
}

export default PillList;