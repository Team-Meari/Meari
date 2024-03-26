import { useParams } from "react-router-dom";
import { useGetAxios } from "../hooks/useAxios";
import styled from "styled-components";
import Button from "../componentes/Button";
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthProvider";
import MeariList from "./MeariList";
import LogModal from "./Login";
import SignOutConfirm from "../modals/SignOutConfirm";
import { useEffect } from "react";
import WidthContext from "../contexts/WidthProvider";

const apiurl = process.env.REACT_APP_URL;

const Wrapper = styled.div`
  position: relative;
  width: 1920px;
  height: 1266px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ffffff;
  @media (max-width: 786px) {
    width: 414px;
    height: 736px;
  }
`;
const Header = styled.div`
  /* Frame 56 */

  box-sizing: border-box;

  position: absolute;
  width: 1920px;
  height: 90px;
  left: 0px;
  top: 0px;

  background: #ffffff;
  border-bottom: 1px solid #e3e3e3;
  @media (max-width: 786px) {
    display: none;
  }
`;
const HeaderText = styled.text`
  /* MEARI */

  position: absolute;
  width: 161px;
  height: 46px;
  left: 247px;
  top: 22px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 800;
  font-size: 46px;
  line-height: 100%;
  /* identical to box height, or 46px */

  color: #0cb46c;
`;
const BtnWrapper = styled(Button)`
  /* Frame 57 */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 33px 24px;
  gap: 10px;

  position: absolute;
  width: 114px;
  height: 89px;
  left: 1556px;
  top: 0px;

  border: none;

  background: #0cb46c;
`;
const MapBtn = styled.div`
  /* Frame 58 */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 8px;

  width: 66px;
  height: 57px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const MapSvg = styled.svg`
  /* map-2-line */

  width: 34px;
  height: 34px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const BtnText = styled.text`
  /* 지도로 가기 */

  width: 66px;
  height: 15px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 100%;
  /* identical to box height, or 15px */
  letter-spacing: -0.04em;

  color: #ffffff;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
`;
const MainText = styled.text`
  /* 마이페이지 */

  position: absolute;
  width: 147px;
  height: 34px;
  left: 260px;
  top: 170px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  line-height: 100%;
  /* identical to box height, or 34px */

  color: #000000;
  @media (max-width: 786px) {
    display: none;
  }
`;
const UserWrapper = styled.div`
  /* Frame 1 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 44px 99px;
  gap: 10px;

  position: absolute;
  width: 130px;
  height: 130px;
  left: 250px;
  top: 224px;

  background: #f8f8f8;
  border-radius: 26px;
  @media (max-width: 786px) {
    /* Frame 74 */
    display: flex;
    position: absolute;
    width: 414px;
    height: 123px;
    left: 0px;
    top: 0px;
    border-radius: 0px;
  }
`;
const UserInfo = styled.div`
  /* Frame 54 */
  position: absolute;
  width: 137px;
  height: 189px;
  left: 0px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
  @media (max-width: 786px) {
    /* Frame 54 */

    position: absolute;
    width: 137px;
    height: 144px;
    left: calc(7%);
    top: 5px;
  }
`;
const UserIcon = styled.div`
  /* Frame 53 */

  position: absolute;
  width: 120px;
  height: 120px;
  left: 109px;

  background: #ffffff;
  border-radius: 360px;

  @media (max-width: 786px) {
    /* Frame 53 */

    position: absolute;
    width: 86px;
    height: 86px;
    left: 125px;
    top: 20px;

    background: #ffffff;
    border-radius: 360px;
  }
`;
const Icons = styled.div`
  /* user-fill */

  position: relative;
  width: 120px;
  height: 120px;
  top: 5px;

  @media (max-width: 786px) {
    /* user-fill */

    position: absolute;
    top: -7px;
  }
`;
const IconSvg = styled.svg`
  width: 70px;
  height: 95px;
  top: 5px;

  position: absolute;
  left: 20.67%;
  right: 20.67%;
  top: 4.17%;
  bottom: 8.33%;

  @media (max-width: 786px) {
    /* Vector */
    width: 50px;
    height: 75px;

    position: absolute;
    left: 15.67%;
    right: 15.67%;
    top: 4.17%;
    bottom: 8.33%;
  }
`;
const Nickname = styled.text`
  /* test1234!! */

  position: absolute;
  width: 95px;
  height: 20px;
  left: 120px;
  top: 150px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
  /* identical to box height, or 20px */
  text-align: center;

  color: #1d1d1d;

  @media (max-width: 786px) {
    top: 120px;
  }
`;
const LogWrapper = styled.div`
  /* Frame 28 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  position: absolute;
  width: 137px;
  height: 16px;
  left: 103px;
  top: 180px;

  @media (max-width: 786px) {
    top: 160px;
  }
`;
const LoginButton = styled(Button)`
  width: auto;
  height: 16px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
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
const SignOut = styled.text`
  /* 회원탈퇴 */

  width: 56px;
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
  order: 2;
  flex-grow: 0;
`;

const ListText = styled.text`
  /* 작성한글 */

  position: absolute;
  width: 90px;
  height: 24px;
  left: 658px;
  top: 180px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
  /* identical to box height, or 24px */

  color: #000000;
  @media (max-width: 786px) {
    /* 작성한글 */

    position: absolute;
    width: 80px;
    height: 20px;
    left: 35px;
    top: 233px;

    font-weight: 600;
    font-size: 20px;
  }
`;

const Footer = styled.div`
  /* Frame 60 */

  position: absolute;
  width: 1920px;
  height: 199px;
  left: 0px;
  top: 1067px;

  background-color: #f8f8f8;
  @media (max-width: 786px) {
    display: none;
  }
`;
const Title = styled.text`
  /* MEARI */

  position: absolute;
  width: 105px;
  height: 30px;
  left: calc(50% - 105px / 2 - 26.5px);
  top: 50px;

  font-family: "Montserrat";
  font-style: normal;
  font-weight: 800;
  font-size: 30px;
  line-height: 100%;
  /* identical to box height, or 30px */

  color: #d7d7d7;
`;
const Terms = styled.div`
  /* Frame 28 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  position: absolute;
  width: 192px;
  height: 16px;
  left: 837px;
  top: 113px;
`;
const UseTerm = styled.text`
  /* 이용약관 */

  width: 56px;
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
  order: 0;
  flex-grow: 0;
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
const Identify = styled.text`
  /* 개인정보취급방침 */

  width: 111px;
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
  order: 2;
  flex-grow: 0;
`;
const Copyright = styled.text`
  /* copyright ⓒ MEARI All right reserved */

  position: absolute;
  width: 264px;
  height: 16px;
  left: 801px;
  top: 163px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  color: #666666;
`;

function MyPage() {
  const [LoginOpen, setLoginOpen] = useState(false);
  const [SignOutOpen, setSignOutOpen] = useState(false);
  const { nickname, memberId } = useParams();
  const { auth, setAuth } = useContext(AuthContext);
  const { isMoblie } = useContext(WidthContext);
  console.log("마이페이지에서 모바일 인가요? ", isMoblie);
  // 마이페이지 진입 시 내가 쓴 글 조회
  const { data, refetch } = useGetAxios(
    {
      url: apiurl + `chats/myPage`,
      method: "GET",
    },
    "mydata"
  );

  useEffect(() => {
    refetch();
  }, []);

  // 회원탈퇴 버튼 클릭 시 회원탈퇴하는 로직
  const onClick = () => {
    setSignOutOpen(true);
  };

  const onLoginClick = () => {
    setLoginOpen(true);
  };
  return (
    <Wrapper>
      <Header>
        <HeaderText>MEARI</HeaderText>
        <BtnWrapper>
          <MapBtn>
            <MapSvg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.833496 5.08325L10.7502 0.833252L19.2502 5.08325L28.1794 1.25641C28.5391 1.10231 28.9555 1.26886 29.1096 1.62844C29.1473 1.71661 29.1668 1.81155 29.1668 1.90747V24.9166L19.2502 29.1666L10.7502 24.9166L1.82086 28.7434C1.46128 28.8976 1.04488 28.731 0.890772 28.3714C0.852975 28.2833 0.833496 28.1882 0.833496 28.0923V5.08325ZM20.6668 25.4769L26.3335 23.0483V5.13012L20.6668 7.55868V25.4769ZM17.8335 25.2905V7.54269L12.1668 4.70935V22.4571L17.8335 25.2905ZM9.3335 22.4411V4.52297L3.66683 6.95154V24.8697L9.3335 22.4411Z"
                fill="white"
              />
            </MapSvg>
            <BtnText>지도로 가기</BtnText>
          </MapBtn>
        </BtnWrapper>
      </Header>

      <MainText>마이페이지</MainText>
      <UserWrapper>
        <UserInfo>
          <UserIcon>
            <Icons>
              <IconSvg
                width="80"
                height="89"
                viewBox="0 0 80 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 105C0 82.9085 17.9086 65 40 65C62.0915 65 80 82.9085 80 105H0ZM40 60C23.425 60 10 46.575 10 30C10 13.425 23.425 0 40 0C56.575 0 70 13.425 70 30C70 46.575 56.575 60 40 60Z"
                  fill="#E3E3E3"
                />
              </IconSvg>
            </Icons>
          </UserIcon>
          <Nickname>{nickname}</Nickname>
          <LogWrapper>
            <LoginButton onClick={onLoginClick}>
              {auth ? "로그아웃" : "로그인"}
            </LoginButton>
            {LoginOpen ? (
              <LogModal LoginOpen={LoginOpen} setLoginOpen={setLoginOpen} />
            ) : null}
            <Bar>|</Bar>
            <SignOut onClick={onClick}>회원탈퇴</SignOut>
            {SignOutOpen ? (
              <SignOutConfirm
                SignOutOpen={SignOutOpen}
                setSignOutOpen={setSignOutOpen}
                memberId={memberId}
                setAuth={setAuth}
              />
            ) : null}
          </LogWrapper>
        </UserInfo>
      </UserWrapper>

      <ListText>작성한 글</ListText>
      <MeariList data={data?.data} $custom={true} />

      <Footer>
        <Title>MEARI</Title>
        <Terms>
          <UseTerm>이용약관</UseTerm>
          <Bar>|</Bar>
          <Identify>개인정보처리방침</Identify>
        </Terms>
        <Copyright>copyright ⓒ MEARI All right reserved </Copyright>
      </Footer>
    </Wrapper>
  );
}

export default MyPage;
