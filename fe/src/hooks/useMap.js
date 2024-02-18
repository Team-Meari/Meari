import { useState, useEffect } from "react";
import styles from "../hooks/useMap.module.css";

const { kakao } = window;

export const useMap = () => {
  const [map, setMap] = useState(null);
  const [myposition, setPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        makeMap(position.coords.latitude, position.coords.longitude);
        setPosition(position.coords);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const makeMap = (lat, lon) => {
    var container = document.getElementById("map");

    if (!lat && !lon) {
      var options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
    } else {
      var options = {
        center: new kakao.maps.LatLng(lat, lon),
        level: 3,
      };
    }

    var map = new kakao.maps.Map(container, options);
    setMap(map);
  };

  /*
  현재 아이디어.
  메아리가 생성될때 해당 메아리를 서버로 보냄
  보낼 때 작성자, 내용 뿐만 아니라 위치정보까지 함께 보냄 -> 위치 정보로 지도에 디스플레이
  그리고 이 내용을 주기적으로 받아서 refetch 시켜줌
  이걸 통해서 지도에 실시간 통신하는것 처럼 보여줌
  */
  const makeMeari = (map, comment) => {
    // 커스텀 오버레이가 표시될 위치입니다
    var position = new kakao.maps.LatLng(
      myposition.latitude,
      myposition.longitude
    );
    var content = `<div class=${styles.label}><span class=${styles.left}></span><span class=${styles.center}>${comment}</span><span class=${styles.right}></span></div>`;
    // 커스텀 오버레이를 생성합니다
    var customOverlay = new kakao.maps.CustomOverlay({
      position: position,
      content: content,
      xAnchor: 0.3,
      yAnchor: 0.91,
    });

    // 커스텀 오버레이를 지도에 표시합니다
    customOverlay.setMap(map);
  };

  const makeAfterMeari = (map) => {};
  const reset = () => {
    setMap(map);
  };
  return { map, makeMeari, reset };
};
