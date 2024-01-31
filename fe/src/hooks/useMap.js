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
    setMap(map);
  }, []);

  const makeMeari = (map) => {};

  const makeAfterMeari = (map) => {};

  return { map, makeMeari };
};
