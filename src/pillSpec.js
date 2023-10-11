
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PillSpec() {

  const [data, setData] = useState([]);

  useEffect(() => {
    // 서버에서 데이터를 가져오는 요청
    axios.get('https://api.example.com/pillCodes') // 실제 엔드포인트로 대체해야 합니다.
      .then(response => {
        // 서버에서 받아온 데이터를 상태에 저장
        setData(response.data);
      })
      .catch(error => {
        console.error('데이터를 받아오는 중 오류 발생:', error);
      });
  }, []);

  // useParams 훅을 사용하는 예시
  const { pillCode } = useParams();

  // 컴포넌트 내용 반환
  return (
    <div>
      <h2>Pill Spec 페이지 - {pillCode}</h2>
      <p>약 이름: {data.name}</p>
      
    </div>
  );
}

export default PillSpec;
