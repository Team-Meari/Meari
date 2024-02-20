import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "./componentes/Button";
import LogModal from "./routes/Login";
import { useMap } from "./hooks/useMap";
import MeariList from "./routes/MeariList";
import Input from "./componentes/Input";
import { useInput } from "./hooks/useInput";
import { useGetAxios } from "./hooks/useAxios";
import { usePostAxios } from "./hooks/useAxios";
import styled from "styled-components";

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
  const { map, makeMeari, myposition } = useMap();
  const input = useInput("");

  const userdata = useGetAxios(
    {
      url: "/members/find-all",
      method: "GET",
    },
    "userdata"
  );

  const mearidata = useGetAxios(
    {
      url: "/chats/find-all?size=100",
      method: "GET",
    },
    "mearidata"
  );

  const { mutation } = usePostAxios("mearidata");

  const onSubmitMeari = () => {
    // 메아리 외치기를 했을 때
    // 메아리가 서버로 전송되는 로직이 필요함.
    mutation.mutate({
      url: "/chats",
      method: "POST",
      data: {
        content: input.value,
        latitude: myposition.latitude,
        longitude: myposition.longitude,
      },
    });
    input.textClear();
  };

  const onMemberTest = () => {
    userdata.refetch();
    console.log(userdata.data);
  };

  useEffect(() => {
    mearidata.data?.map((item, index) => {
      return makeMeari(map, item?.content, item?.latitude, item?.longitude);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [[], mearidata.data]);

  return (
    <Wrapper>
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
              <Button usage={"회원가입"} />
            </Link>
          </Menu>

          {/* Meari를 디스플레이해주는 리스트 컴포넌트 MeariList */}
          <MeariList data={mearidata.data} />

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
    </Wrapper>
  );
}

export default App;
