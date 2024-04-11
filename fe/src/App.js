import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import BasicMap from "./componentes/Map";
import Button from "./componentes/Button";
import LogModal from "./routes/Login";
import MeariList from "./routes/MeariList";
import { useTextArea } from "./hooks/useInput";
import { useGetAxios } from "./hooks/useAxios";
import { usePostAxios } from "./hooks/useAxios";
import styled from "styled-components";
import userContext from "./contexts/UserProvider";
import AuthContext from "./contexts/AuthProvider";
import SignUp from "./routes/SignUp";
import { Default, Mobile } from "./componentes/MediaQueries";
import WidthContext from "./contexts/WidthProvider";
import MobileHeader from "./mobile_components/MobileHeader";
import ModalContext from "./contexts/ModalProvider";
import { FindIdModal, FindPwModal } from "./modals/FindIdPw";
import Success from "./modals/Success";
import Loading from "./componentes/Loading";
import DeleteConfirm from "./modals/DeleteConfirm";

const url = process.env.REACT_APP_URL;

const apiurl = window.location.hostname === "localhost" ? url : "api/";

const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 100vh;

  background: #ffffff;
`;
const MobileWrapper = styled.div`
  @media (max-width: 786px) {
    overflow: hidden;
  }
`;

const OpenContainer = styled.div`
  /* Frame 1 */

  position: absolute;
  width: 100px;
  height: 100px;
  left: 40px;
  top: 40px;

  background: rgba(255, 255, 255, 0.4);
  border-radius: 26px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Open = styled(Button)`
  /* Frame 9 */

  position: absolute;
  width: 60px;
  height: 60px;
  left: 20px;
  top: 20px;

  background: #f8f8f8;
  box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.3);
  border-radius: 16px;
  border: none;

  @media (max-width: 768px) {
    /* Frame 76 */

    position: absolute;
    width: 50px;
    height: 50px;
    left: calc(88%);
    top: 0px;

    border: none;
    border-radius: 0px;
    box-shadow: none;
    background: #0cb46c;
  }
`;

const OpenWrapper = styled.div`
  /* skip-left-line */

  position: absolute;
  width: 40px;
  height: 40px;
  left: 27px;
  top: 12px;

  transform: matrix(-1, 0, 0, 1, 0, 0);
`;

const OpenSvg = styled.svg`
  /* Vector */

  position: absolute;
  left: 70%;
  right: -11.3%;
  top: 27.5%;
  bottom: 28.71%;

  transform: matrix(-1, 0, 0, 1, 0, 0);
`;

const MobileMenuSvg = styled.svg`
  /* align-left */

  position: absolute;
  width: 24px;
  height: 24px;
  left: 13px;
  top: 13px;
`;

const Section = styled.div`
  z-index: 5;
  position: absolute;
  width: 460px;
  height: 850px;
  left: 40px;
  top: 40px;

  background: #ffffff;
  border-radius: 26px;

  ${(props) =>
    props.$isfold
      ? `
        max-height: 0px;
        max-width: 0px;
        opacity: 0;
        overflow: hidden;
        transition: max-height 0.5s ease-out,max-width 0.5s ease-out, opacity 0.5s ease-out;
        animation-timing-function: ease-in;
        animation-duration: 300ms;
  `
      : `
        max-height: 850px;
        max-width: 460px;
        opacity: 1;
        transition: max-height 0.5s ease-out,max-width 0.5s ease-out, opacity 0.5s ease-out;
        animation-timing-function: ease-in;
        animation-duration: 300ms;
      
      `}

  @media (max-width: 768px) {
    /* 모바일/메인/사이드네비 */

    position: relative;
    width: 95vw;
    height: 100vh;
    left: calc(50% - 95vw / 2);
    top: 0px;

    background: #ffffff;
  }
`;

const Fold = styled(Button)`
  /* Frame 9 */

  position: absolute;
  width: 60px;
  height: 60px;
  left: 369px;
  top: 41px;

  background: #f8f8f8;
  border-radius: 16px;
  border: none;

  @media (max-width: 768px) {
    /* close-large-fill */

    position: absolute;
    width: 24px;
    height: 24px;
    left: 375px;
    top: 25px;

    background: none;
  }
`;

const FoldWrapper = styled.div`
  /* skip-left-line */

  position: absolute;
  width: 40px;
  height: 40px;
  left: 10px;
  top: 10px;
`;

const FoldSvg = styled.svg`
  /* Vector */

  position: absolute;
  left: 30%;
  right: 28.7%;
  top: 27.5%;
  bottom: 28.71%;
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

  @media (max-width: 786px) {
    /* Frame 28 */
    width: 111px;
    height: 14px;
    left: 14px;
    top: 68px;
  }
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
  text-decoration: none;
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
  @media (max-width: 768px) {
    /* MEARI */

    position: absolute;
    width: 95px;
    height: 20px;
    left: 15px;
    top: 15px;
    font-size: ${(props) => (props.$isfold === undefined ? "26px" : "46px")};
  }
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
  height: auto;
  left: calc(50% - 530px / 2 + 204px);
  top: 780px;

  background: rgba(12, 180, 108, 0.3);
  border: 1px solid rgba(12, 180, 108, 0.55);
  box-shadow: 0px 4px 34px rgba(6, 106, 63, 0.45);
  border-radius: 26px;
  border: none;

  @media (max-width: 768px) {
    /* Frame 37 */

    box-sizing: border-box;

    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 15px;
    gap: 10px;

    position: absolute;
    width: 414px;
    height: auto;
    left: calc(50% - 414px / 2);
    top: 656px;

    background: rgba(12, 180, 108, 0.2);
    box-shadow: 0px -4px 15px rgba(6, 106, 63, 0.15);

    transform: none;
    transition: none;
  }

  ${(props) =>
    props.$isfold
      ? `
      transform: translateX(-175px); /* 접혔을 때의 위치 */
      transition: transform 0.5s ease-out
  `
      : `
      transform: translateX(0); /* 펼쳐졌을 때의 위치 */
      transition: transform 0.5s ease-out
      
      `}
`;

const InputBackGround = styled.div`
  box-sizing: border-box;

  width: 500px;
  height: auto;

  background: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 16px;

  @media (max-width: 768px) {
    /* input */
    width: 384px;
    height: auto;
  }
`;
const MeariInput = styled.textarea`
  box-sizing: border-box;

  width: 420px;
  height: 20px;
  max-height: 58px;
  top: 20px;

  align-items: center;
  margin: 20px;

  background: transparent;
  border: none;
  //border-radius: 16px;
  outline: none;

  resize: none; /* 세로 방향 크기 조절만 허용 */
  overflow-y: auto; /* 내용이 넘칠 때 스크롤바 자동으로 나타나도록 설정 *

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;

  @media (max-width: 768px) {
    /* input */
    width: 284px;
    max-height: 30px;
  }
`;

const MeariSubmit = styled(Button)`
  /* Frame 35 */

  position: absolute;
  width: 50px;
  height: 50px;
  right: 20px;
  top: 23px;

  background: #11a968;
  border-radius: 16px;
  border: none;

  @media (max-width: 768px) {
    /* Frame 35 */

    position: absolute;
    width: 35px;
    height: 35px;
    top: 30px;

    background: #11a968;
    border-radius: 12px;
  }
`;

const Svg = styled.svg`
  /* send-plane-fill */

  position: absolute;
  width: 21px;
  height: 21px;
  left: 14px;
  top: 15px;

  @media (max-width: 768px) {
    /* Frame 35 */

    /* send-plane-fill */

    position: absolute;
    width: 20px;
    height: 20px;
    left: 8px;
    top: 8px;
  }
`;

const LoginButton = styled(Button)`
  width: auto;
  height: 16px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 16px */
  background-color: transparent;
  border: none;
  color: #666666;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;

function App() {
  const [myposition, setPosition] = useState(null);
  const [isFold, setIsFold] = useState(false);
  const [mobileFold, setMobileFold] = useState(true);
  const [loading, setLoading] = useState(true);
  const { nickname, memberId } = useContext(userContext);
  const { auth } = useContext(AuthContext);
  const { isMobile } = useContext(WidthContext);
  const {
    isIdOpen,
    setIsIdOpen,
    isPwOpen,
    setIsPwOpen,
    LoginOpen,
    setLoginOpen,
    isSuccess,
    setSuccessOpen,
    isPwSuccess,
    setPwSuccessOpen,
    isErrorOpen,
    setErrorOpen,
  } = useContext(ModalContext);
  const textarea = useRef();
  const input = useTextArea(textarea);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
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

  const onLoginClick = () => {
    setLoginOpen(true);
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <Default>
        <Wrapper>
          <OpenContainer>
            <Open
              onClick={() => {
                setIsFold((prev) => {
                  return !prev ? true : false;
                });
                console.log(isFold);
              }}
            >
              <OpenWrapper>
                <OpenSvg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.24331 8.75888L0.48 1.99561L2.47559 0L11.2345 8.75888L2.47559 17.5178L0.48 15.5222L7.24331 8.75888ZM17 17.2255V0.292241H14.1778V17.2255H17Z"
                    fill="#999999"
                  />
                </OpenSvg>
              </OpenWrapper>
            </Open>
          </OpenContainer>
          <Section $isfold={isFold}>
            <Title>MEARI</Title>
            <Fold
              onClick={() => {
                setIsFold((prev) => {
                  return !prev ? true : false;
                });
                console.log(isFold);
              }}
            >
              <FoldWrapper>
                <FoldSvg
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.75669 8.75888L16.52 1.99561L14.5244 0L5.76551 8.75888L14.5244 17.5178L16.52 15.5222L9.75669 8.75888ZM0 17.2255V0.292241H2.82222V17.2255H0Z"
                    fill="#999999"
                  />
                </FoldSvg>
              </FoldWrapper>
            </Fold>
            <Menu>
              {/* 로그인 모달 컴포넌트 LogModal */}
              <LoginButton onClick={onLoginClick}>
                {auth ? "로그아웃" : "로그인"}
              </LoginButton>
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
            <MeariList $custom={false} data={mearidata.data?.data} />

            {/* <RedButton usage={"멤버 읽기"} onClick={onMemberTest} /> */}
          </Section>

          <BasicMap
            lat={myposition?.latitude}
            lng={myposition?.longitude}
            mearidata={mearidata}
          />
          <InputContainer $isfold={isFold}>
            <InputBackGround>
              <MeariInput
                rows={1}
                ref={textarea}
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
            </InputBackGround>
          </InputContainer>
        </Wrapper>
        {LoginOpen ? (
          <LogModal LoginOpen={LoginOpen} setLoginOpen={setLoginOpen} />
        ) : null}
        {isIdOpen ? (
          <FindIdModal isIdOpen={isIdOpen} setIsIdOpen={setIsIdOpen} />
        ) : null}
        {isPwOpen ? (
          <FindPwModal isPwOpen={isPwOpen} setIsPwOpen={setIsPwOpen} />
        ) : null}
        {isSuccess ? (
          <Success SuccessOpen={isSuccess} setSuccessOpen={setSuccessOpen} />
        ) : null}
        {isPwSuccess ? (
          <Success
            SuccessOpen={isPwSuccess}
            setSuccessOpen={setPwSuccessOpen}
            isPw={true}
          />
        ) : null}
        {isErrorOpen ? (
          <DeleteConfirm
            isErrorOpen={isErrorOpen}
            setErrorOpen={setErrorOpen}
          />
        ) : null}
      </Default>

      {/** 여기부터는 모바일 버전 컴포넌트 구성 */}

      <Mobile>
        {mobileFold ? (
          <MobileWrapper>
            <MobileHeader>
              <Title>MEARI</Title>
              <Open
                onClick={() => {
                  setMobileFold((prev) => {
                    return !prev ? true : false;
                  });
                }}
              >
                <MobileMenuSvg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 4H21V6H3V4ZM3 19H17V21H3V19ZM3 14H21V16H3V14ZM3 9H17V11H3V9Z"
                    fill="white"
                  />
                </MobileMenuSvg>
              </Open>
            </MobileHeader>
            <BasicMap
              lat={myposition?.latitude}
              lng={myposition?.longitude}
              mearidata={mearidata}
            />
            <InputContainer $isfold={isFold}>
              <InputBackGround>
                <MeariInput
                  rows={1}
                  ref={textarea}
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
              </InputBackGround>
            </InputContainer>
          </MobileWrapper>
        ) : (
          <Section $isfold={isFold}>
            <Title $isfold={isFold}>MEARI</Title>
            <Fold
              onClick={() => {
                setMobileFold((prev) => {
                  return !prev ? true : false;
                });
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5859 10.0001L0.792969 2.20718L2.20718 0.792969L10.0001 8.58582L17.793 0.792969L19.2072 2.20718L11.4143 10.0001L19.2072 17.7929L17.793 19.2072L10.0001 11.4143L2.20718 19.2072L0.792969 17.7929L8.5859 10.0001Z"
                  fill="black"
                />
              </svg>
            </Fold>
            <Menu>
              {/* 로그인 모달 컴포넌트 LogModal */}
              <LoginButton onClick={onLoginClick}>
                {auth ? "로그아웃" : "로그인"}
              </LoginButton>
              {LoginOpen ? (
                <LogModal
                  LoginOpen={LoginOpen}
                  setLoginOpen={setLoginOpen}
                  isMobile={isMobile}
                />
              ) : null}
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
            <MeariList $custom={false} data={mearidata.data?.data} />
            {LoginOpen ? (
              <LogModal LoginOpen={LoginOpen} setLoginOpen={setLoginOpen} />
            ) : null}
            {isIdOpen ? (
              <FindIdModal isIdOpen={isIdOpen} setIsIdOpen={setIsIdOpen} />
            ) : null}
            {isPwOpen ? (
              <FindPwModal isPwOpen={isPwOpen} setIsPwOpen={setIsPwOpen} />
            ) : null}
            {isSuccess ? (
              <Success
                SuccessOpen={isSuccess}
                setSuccessOpen={setSuccessOpen}
              />
            ) : null}
            {isPwSuccess ? (
              <Success
                SuccessOpen={isPwSuccess}
                setSuccessOpen={setPwSuccessOpen}
                isPw={true}
              />
            ) : null}
          </Section>
        )}
        {isErrorOpen ? (
          <DeleteConfirm
            isErrorOpen={isErrorOpen}
            setErrorOpen={setErrorOpen}
          />
        ) : null}
      </Mobile>
    </>
  );
}

export default App;
