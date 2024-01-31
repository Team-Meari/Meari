import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./componentes/Button";
import LogModal from "./routes/Login";
import { useMap } from "./hooks/useMap";
import MeariList from "./routes/MeariList";
import styles from "../src/css/App.module.css";
import Input from "./componentes/Input";
import { useInput } from "./hooks/useInput";

const { kakao } = window;

function App() {
  const { map } = useMap();
  const input = useInput(null);

  const [mvalue, setMvalue] = useState(null);
  const onSubmitMeari = () => {
    setMvalue(input.value);
    console.log(input.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.menulist}>
        <h1>Hi This is Meari!!</h1>
        {/* 로그인 모달 컴포넌트 LogModal */}
        <LogModal />

        {/* mypage로 이동하는 버튼 */}
        <Link to="/mypage">
          <Button usage={"마이페이지"} />
        </Link>

        {/* Meari를 디스플레이해주는 리스트 컴포넌트 MeariList */}
        <MeariList mvalue={mvalue} />
        <Input placeholder={"메아리를 외쳐보세요!!"} {...input} />
        <Button usage={"확인"} onClick={onSubmitMeari} />
      </div>
      <div className={styles.map} id="map"></div>
    </div>
  );
}

export default App;
