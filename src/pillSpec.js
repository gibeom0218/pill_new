import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Image } from '@mui/icons-material';
import './pillSpec.css' // Import a CSS file for styling (you should create this file)

function PillSpec() {
  const [data, setData] = useState({});
  const { itemSeq } = useParams();

  useEffect(() => {
    axios
      .get(`http://110.12.181.206:8081/pillSpec/?itemSeq=${itemSeq}`)
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
    <div className="pill-spec-container">
      <h1 className="left-aligned larger-text">{data.itemName}</h1>
      {data.itemImage ? (
        <img
          src={data.itemImage}
          alt={data.itemName}
          style={{ width: '50%', height: '100%' }}
          onClick={() => openImageInNewWindow(data.itemImage)}
          
        />
        
      ) : (
        <Image />
      )}
      
      


      <div className="left-aligned">
        
        <h2>주의사항</h2>
        {data.atpnQesitm}
        <div class="jb-division-line"></div>
        <h2>병용금기</h2>
        {data.intrcQesitm}
        <div class="jb-division-line"></div>
        <h2>효능효과</h2>
        {data.efcyQesitm}
        <div class="jb-division-line"></div>
        <h2>복용방법</h2>
        {data.useMethodQesitm}
        <div class="jb-division-line"></div>
        <h2>부작용</h2>
        {data.seQesitm}
        <div class="jb-division-line"></div>
        <h2>보관방법</h2>
        {data.depositMethodQesitm}
      </div>
    </div>
  );
}

export default PillSpec;
