import { useState, useCallback, useEffect } from "react";
import Button from "./componentes/Button";
import LogModal from "./routes/Login";

const { kakao } = window;

function App() {
  useEffect(() => {
    var container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    var map = new kakao.maps.Map(container, options);
  }, []);
  return (
    <div className="App">
      <h1>Hi This is Meari!!</h1>
      <LogModal />
      <div id="map" style={{ width: 500, height: 400 }}></div>
    </div>
  );
}

export default App;
