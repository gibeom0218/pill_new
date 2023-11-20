import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Button, AppBar, Toolbar } from '@mui/material';
import { Image} from '@mui/icons-material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // Import the MedicalServicesIcon
import './pillSpec.css' // Import a CSS file for styling (you should create this file)

function PillSpec() {
  const [data, setData] = useState({});
  const { itemSeq } = useParams();

  useEffect(() => {
    axios
      .get(`http://110.12.181.206:8081/pillSpec/?ediCode=${itemSeq}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('데이터를 받아오는 중 오류 발생:', error);
      });
  }, [itemSeq]);

  const openImageInNewWindow = (image) => {
    const newWindow = window.open('', '_blank');
    newWindow.document.write(`<html><body><img src="${image}" /></body></html>`);
  };

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
      <br></br>
    <div className="pill-spec-container">
      <h1 className="left-aligned larger-text">{data.ITEM_NAME}</h1>
      {data.ITEM_IMAGE ? (
        <img
          src={data.ITEM_IMAGE}
          alt={data.ITEM_NAME}
          style={{ width: '50%', height: '100%' }}
          onClick={() => openImageInNewWindow(data.ITEM_IMAGE)}
          
        />
        
      ) : (
        <Image />
      )}
      
      


      <div className="left-aligned">
        
        <h2>품목영문명</h2>
        {data.ITEM_ENG_NAME}
        <div class="jb-division-line"></div>
        <h2>보험코드</h2>
        {data.EDI_CODE}
        <div class="jb-division-line"></div>
        <h2>품목기준코드</h2>
        {data.ITEM_SEQ}
        <div class="jb-division-line"></div>
        <h2>주의사항</h2>
        <a href="{data.NB_DOC_ID}">PDF 다운로드 링크</a>
        <div class="jb-division-line"></div>
        <h2>효능효과</h2>
        <a href="{data.EE_DOC_ID}">PDF 다운로드 링크</a>
        <div class="jb-division-line"></div>
        <h2>용법용량</h2>
        <a href="{data.UD_DOC_ID}">PDF 다운로드 링크</a>
        <div class="jb-division-line"></div>
        <h2>성상</h2>
        {data.CHART}
        <div class="jb-division-line"></div>
        <h2>원료성분</h2>
        {data.MATERIAL_NAME}
        <div class="jb-division-line"></div>
        <h2>유효성분</h2>
        {data.MAIN_ITEM_INGR}
        <div class="jb-division-line"></div>
        <h2>저장방법</h2>
        {data.STORAGE_METHOD}
      </div>
     </div>
    </div>
  );
}

export default PillSpec;