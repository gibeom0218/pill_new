import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PillSpec() {
  const [data, setData] = useState({});
  const { pillName } = useParams(); // useParams 훅을 사용하여 URL에서 pillCode를 가져옵니다.

  useEffect(() => {
    // 서버에서 데이터를 가져오는 요청
    axios.get(`http://110.12.181.206:8081/pillSpec/?pillName=${pillName}`)
      .then(response => {
        console.log(response.data);// 서버에서 받아온 데이터를 상태에 저장
        setData(response.data);
      })
      .catch(error => {
        console.error('데이터를 받아오는 중 오류 발생:', error);
      });
  }, [pillName]); // pillCode가 변경될 때마다 useEffect가 다시 실행됩니다.

  return (
    <div>
      
      <p><h2>약 이름</h2> {data.itemName}</p>
      <h2>주의사항</h2>{data.atpnQesitm} <p></p>
      <h2>병용금기 </h2>{data.intrcQesitm}
      <h2>효능효과</h2>{data.efcyQesitm}
      <h2>복용방법</h2>{data.useMethodQesitm}
      <h2>부작용</h2>{data.seQesitm}
      <h2>보관방법</h2>{data.depositMethodQesitm}


      
    </div>
  );
}

export default PillSpec;
