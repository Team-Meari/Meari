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
      options = {
        center: new kakao.maps.LatLng(lat, lon),
        level: 3,
      };
    }

    var map = new kakao.maps.Map(container, options);
    setMap(map);
  };

  const makeMeari = (map, comment, latitude, longitude) => {
    // 커스텀 오버레이가 표시될 위치입니다
    var position = new kakao.maps.LatLng(latitude, longitude);
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

  return { map, makeMeari, myposition };
};
