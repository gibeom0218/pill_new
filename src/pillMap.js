import React, { Component } from 'react';

class KakaoMap extends Component {
  componentDidMount() {
    // Kakao Map SDK 로드
    window.kakao.maps.load(() => {
      const container = document.getElementById('kakao-map');
      const map = new window.kakao.maps.Map(container, {
        center: new window.kakao.maps.LatLng(0, 0), // 초기 중심 좌표
        level: 3, // 지도 확대 레벨
      });

      // 사용자의 현재 위치를 가져와 지도 중심 설정
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLatLng = new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            );
            map.setCenter(userLatLng);

            // '약' 키워드로 약국 검색
            const keyword = '약국';
            const ps = new window.kakao.maps.services.Places();

            // 'keywordSearch' 메서드를 사용하여 검색
            ps.keywordSearch(keyword, (data, status, pagination) => {
              if (status === window.kakao.maps.services.Status.OK) {
                for (let i = 0; i < data.length; i++) {
                  const place = data[i];
                  const placeLatLng = new window.kakao.maps.LatLng(
                    place.y,
                    place.x
                  );
            
                  const pharmacyMarker = new window.kakao.maps.Marker({
                    map,
                    position: placeLatLng,
                    title: place.place_name,
                  });
                }
              }
            }, {
              radius: 5000 // 5km 반경 내에서 검색
            });
            
          },
          (error) => {
            console.error('위치 정보를 가져오는데 실패했습니다.', error);
          },
          { enableHighAccuracy: true }
        );
      }
    });
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center', fontSize: '24px', margin: '20px 0' }}>
          내 근처 약국
        </h1>
        <div id="kakao-map" style={{ width: '100%', height: '800px' }}></div>
      </div>
    );
  }
}

export default KakaoMap;
