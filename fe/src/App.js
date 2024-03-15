import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BasicMap from "./componentes/Map";
import Button from "./componentes/Button";
import LogModal from "./routes/Login";
import MeariList from "./routes/MeariList";
import Input from "./componentes/Input";
import { useInput } from "./hooks/useInput";
import { useGetAxios } from "./hooks/useAxios";
import { usePostAxios } from "./hooks/useAxios";
import styled from "styled-components";
import userContext from "./contexts/UserProvider";
import AuthContext from "./contexts/AuthProvider";
import SignUp from "./routes/SignUp";

const apiurl = process.env.REACT_APP_URL;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 1920px;
  height: 960px;
  background: #ffffff;
`;

const Section = styled.div`
  z-index: 5;
  position: absolute;
  width: 460px;
  height: 800px;
  left: 40px;
  top: 40px;

  background: #ffffff;
  border-radius: 26px;
`;

const Menu = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  position: absolute;
  width: 123px;
  height: 16px;
  left: 30px;
  top: 96px;

  background-color: "#FFFFFF";
`;

const MainLink = styled(Link)`
  width: auto;
  height: 16px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 16px */

  color: #666666;

  /* Inside auto layout */
  flex: none;
  order: 2;
  flex-grow: 0;
  background-color: transparent;
`;

const Bar = styled.text`
  /* | */

  width: 5px;
  height: 16px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  color: #666666;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const Title = styled.text`
  position: absolute;
  width: 161px;
  height: 46px;
  left: 28px;
  top: 40px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 800;
  font-size: 46px;
  line-height: 100%;
  /* identical to box height, or 46px */

  color: #0cb46c;
`;

const InputContainer = styled.div`
  /* Frame 37 */

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  gap: 10px;

  position: absolute;
  width: 530px;
  height: 95px;
  left: calc(50% - 530px / 2 + 204px);
  top: 780px;

  background: rgba(12, 180, 108, 0.3);
  border: 1px solid rgba(12, 180, 108, 0.55);
  box-shadow: 0px 4px 34px rgba(6, 106, 63, 0.45);
  border-radius: 26px;
  border: none;
`;

const MeariInput = styled(Input)`
  box-sizing: border-box;

  width: 500px;
  height: 65px;

  background: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 16px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const MeariSubmit = styled(Button)`
  /* Frame 35 */

  position: absolute;
  width: 50px;
  height: 50px;
  right: 10px;
  top: 12px;

  background: #11a968;
  border-radius: 16px;
  border: none;
`;

const Svg = styled.svg`
  /* send-plane-fill */

  position: absolute;
  width: 21px;
  height: 21px;
  left: 14px;
  top: 15px;
`;

function App() {
  const [myposition, setPosition] = useState(null);
  const { nickname, memberId } = useContext(userContext);
  const { auth } = useContext(AuthContext);
  const input = useInput("");

  const mearidata = useGetAxios(
    {
      url: apiurl + "chats/find-all?size=100",
      method: "GET",
    },
    "mearidata"
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition(position.coords);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const { mutation } = usePostAxios("mearidata");

  const onSubmitMeari = () => {
    // 메아리 외치기를 했을 때
    // 메아리가 서버로 전송되는 로직이 필요함.
    mutation.mutate({
      url: apiurl + "chats",
      method: "POST",
      data: {
        content: input.value,
        latitude: myposition.latitude,
        longitude: myposition.longitude,
      },
    });
    input.textClear();
  };

  return (
    <Wrapper>
      <Section>
        <Title>MEARI</Title>
        <Menu>
          {/* 로그인 모달 컴포넌트 LogModal */}
          <LogModal />
          <Bar>|</Bar>
          {/* mypage로 이동하는 버튼 */}
          {auth ? (
            <MainLink to={`/mypage/${nickname}/${memberId}`}>
              마이페이지
            </MainLink>
          ) : null}
          {/* 회원가입으로 이동하는 버튼 */}
          {!auth ? <SignUp /> : null}
        </Menu>

        {/* Meari를 디스플레이해주는 리스트 컴포넌트 MeariList */}
        <MeariList data={mearidata.data?.data} />

        {/* <RedButton usage={"멤버 읽기"} onClick={onMemberTest} /> */}
      </Section>

      <BasicMap
        lat={myposition?.latitude}
        lng={myposition?.longitude}
        mearidata={mearidata}
      />
      <InputContainer>
        <MeariInput
          name={"mearivalue"}
          placeholder={"메아리를 외쳐보세요!!"}
          {...input}
        ></MeariInput>
        <MeariSubmit onClick={onSubmitMeari}>
          <Svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.0931 6.91655C0.635877 6.76414 0.632263 6.51824 1.10251 6.3615L17.8029 0.794685C18.2653 0.640545 18.5306 0.899378 18.401 1.35287L13.6294 18.0534C13.4973 18.5157 13.2308 18.5318 13.0354 18.0922L9.8902 11.0156L15.1402 4.01559L8.14022 9.26555L1.0931 6.91655Z"
              fill="white"
            />
          </Svg>
        </MeariSubmit>
      </InputContainer>
    </Wrapper>
  );
}

export default App;
