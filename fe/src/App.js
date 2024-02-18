import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Button from "./componentes/Button";
import LogModal from "./routes/Login";
import { useMap } from "./hooks/useMap";
import MeariList from "./routes/MeariList";
import Input from "./componentes/Input";
import { useInput } from "./hooks/useInput";
import { useGetAxios } from "./hooks/useAxios";
import styled from "styled-components";
import { useQueryClient } from "@tanstack/react-query";

const { kakao } = window;

const apiurl = process.env.REACT_APP_URL;

const Wrapper = styled.div`
  display: flex;
  background-color: blue;
`;

const Map = styled.div`
  z-index: 0;
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 5;
`;
const Container = styled.div`
  display: flex;
`;

const RedButton = styled(Button)`
  &:hover {
    background-color: red;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: right;
`;

const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const queryClient = useQueryClient();

  const [mvalue, setMvalue] = useState(null);
  const [isOutLet, setIsOutLet] = useState(true);

  const { map, makeMeari, reset } = useMap();
  const input = useInput("");

  const { data, isLoading, refetch, error } = useGetAxios({
    url: apiurl + "members/find-all",
    method: "GET",
  });

  const onSubmitMeari = () => {
    // 메아리 외치기를 했을 때
    // 메아리가 서버로 전송되는 로직이 필요함.
    setMvalue(input.value);
    makeMeari(map, input.value);
    input.textClear();
  };

  const onMemberTest = () => {
    refetch();
    console.log(data);
  };

  const onSignUpClick = () => {
    setIsOutLet(false);
  };

  useEffect(() => {
    reset();
  }, [isOutLet]);

  return (
    <Wrapper>
      {isOutLet ? (
        <Container>
          <Section>
            <Title>Hi This is Meari!!</Title>
            <Menu>
              {/* 로그인 모달 컴포넌트 LogModal */}
              <LogModal />

              {/* mypage로 이동하는 버튼 */}
              <Link to="/mypage">
                <Button usage={"마이페이지"} />
              </Link>

              {/* 회원가입으로 이동하는 버튼 */}
              <Link to="/signup">
                <Button usage={"회원가입"} onClick={onSignUpClick} />
              </Link>
            </Menu>

            {/* Meari를 디스플레이해주는 리스트 컴포넌트 MeariList */}
            <MeariList value={mvalue} />

            <Input
              name={"mearivalue"}
              placeholder={"메아리를 외쳐보세요!!"}
              {...input}
            />
            <Button usage={"확인"} onClick={onSubmitMeari} />
            <RedButton usage={"멤버 읽기"} onClick={onMemberTest} />
          </Section>
          <Map id="map"></Map>
        </Container>
      ) : (
        <Outlet context={[isOutLet, setIsOutLet]} />
      )}
    </Wrapper>
  );
}

export default App;
