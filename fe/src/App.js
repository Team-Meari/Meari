import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./componentes/Button";
import LogModal from "./routes/Login";
import { useMap } from "./hooks/useMap";
import MeariList from "./routes/MeariList";
import Input from "./componentes/Input";
import { useInput } from "./hooks/useInput";
import { useGetAxios } from "./hooks/useAxios";
import styled from "styled-components";

const { kakao } = window;

const apiurl = process.env.REACT_APP_URL;

const Wrapper = styled.div`
  display: flex;
  background-color: blue;
  z-index: 5;
`;

const Map = styled.div`
  z-index: 0;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const RedButton = styled(Button)`
  &:hover {
    background-color: red;
  }
`;

function App() {
  const { map, makeMeari } = useMap();
  const input = useInput("");

  const { data, userFetch, loading } = useGetAxios({
    url: apiurl + "members/find-all",
    method: "GET",
  });

  const [mvalue, setMvalue] = useState(null);
  const onSubmitMeari = () => {
    // 메아리 외치기를 했을 때
    // 메아리가 서버로 전송되는 로직이 필요함.
    setMvalue(input.value);
    makeMeari(map, input.value);
    input.textClear();
  };

  const onMemberTest = () => {
    userFetch();
    // if (loading === false) console.log(data);
  };

  return (
    <Wrapper>
      <div>
        <h1>Hi This is Meari!!</h1>
        {/* 로그인 모달 컴포넌트 LogModal */}
        <LogModal />

        {/* mypage로 이동하는 버튼 */}
        <Link to="/mypage">
          <Button usage={"마이페이지"} />
        </Link>

        {/* 회원가입으로 이동하는 버튼 */}
        <Link to="/signup">
          <Button usage={"회원가입"} />
        </Link>

        {/* Meari를 디스플레이해주는 리스트 컴포넌트 MeariList */}
        <MeariList value={mvalue} />

        <Input
          name={"mearivalue"}
          placeholder={"메아리를 외쳐보세요!!"}
          {...input}
        />
        <Button usage={"확인"} onClick={onSubmitMeari} />

        <RedButton usage={"멤버 읽기"} onClick={onMemberTest} />
      </div>
      <Map id="map"></Map>
    </Wrapper>
  );
}

export default App;
