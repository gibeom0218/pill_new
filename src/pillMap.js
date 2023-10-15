import React, { Component } from 'react';
import './pillMap.css';

class KakaoMap extends Component {
  componentDidMount() {
    let map; // map 변수를 전역 범위에서 정의
    let customOverlay = null; // 오버레이 객체를 null로 초기화

    window.kakao.maps.load(() => {
      const container = document.getElementById('kakao-map');
      map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(0, 0),
        level: 3,
      });

      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLatLng = new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            map.setCenter(userLatLng);

            const category = 'PM9'; // 약국 카테고리 코드
            const ps = new window.kakao.maps.services.Places();

            ps.categorySearch(category, (data, status, pagination) => {
              if (status === window.kakao.maps.services.Status.OK) {
                for (let i = 0; i < data.length; i++) {
                  const place = data[i];
                  const placeLatLng = new window.kakao.maps.LatLng(
                    place.y,
                    place.x
                  );
                  const width = 80; // 마커 이미지의 너비
                  const height = 80; // 마커 이미지의 높이

                  const options = {
                    alt: 'Custom marker image', // 대체 텍스트
                    clickable: true, // 마커를 클릭 가능하도록 설정
                    zIndex: 3, // 마커의 Z 인덱스
                  };
                  


                  const marker = new window.kakao.maps.Marker({
                    map,
                    position: placeLatLng,
                    title: place.place_name,
                    image: new window.kakao.maps.MarkerImage(
                      '/pharmacy.png', // 이미지 파일 경로로 변경
                      new window.kakao.maps.Size(width, height),
                      options
                    ),
                  });

                  window.kakao.maps.event.addListener(marker, 'click', function () {
                    displayPlaceInfo(place, marker);
                  });
                }
              }
            }, {
              location: userLatLng,
              radius: 5000,
            });
          },
          (error) => {
            console.error('위치 정보를 가져오는데 실패했습니다.', error);
          },
          { enableHighAccuracy: true }
        );
      }
    });

    function displayPlaceInfo(place, marker) {
      // 이전 오버레이 삭제
      if (customOverlay) {
        customOverlay.setMap(null);
      }

      const overlayContent = `
        <div class="custom-overlay">
          <h3>${place.place_name}</h3>
          <p>주소: ${place.address_name}</p>
          <p>전화번호: ${place.phone}</p>
          <p>상세정보: <a href="${place.place_url}" target="_blank">${place.place_name} 바로가기</a></p>
        </div>
      `;

      customOverlay = new window.kakao.maps.CustomOverlay({
        content: overlayContent,
        position: marker.getPosition(), // 마커 위치로 설정
        yAnchor: 1.6, // 오버레이 위치를 마커 아이콘의 하단으로 설정
      });

      customOverlay.setMap(map);
    }
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center', fontSize: '32px', margin: '20px 0' }}>
          내 근처 약국
        </h1>
        <div id="kakao-map" style={{ width: '100%', height: '800px' }}></div>
      </div>
    );
  }
}

export default KakaoMap;
