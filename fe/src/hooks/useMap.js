import { useState, useEffect } from "react";

const { kakao } = window;

export const useMap = () => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    var map = new kakao.maps.Map(container, options);

    // 지도의 현재 영역을 얻어옵니다
    var bounds = map.getBounds();

    // 영역의 남서쪽 좌표를 얻어옵니다
    var swLatLng = bounds.getSouthWest();

    // 영역의 북동쪽 좌표를 얻어옵니다
    var neLatLng = bounds.getNorthEast();

    setMap(map);
  }, []);

  const makeMeari = (map, comment) => {
    // 커스텀 오버레이가 표시될 위치입니다
    var position = new kakao.maps.LatLng(33.450701, 126.570667);

    var content = `<div class ="label"><span class="left"></span><span class="center">${comment}</span><span class="right"></span></div>`;
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

  return { map, makeMeari };
};
