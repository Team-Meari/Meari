import Modal from "react-modal";
import { useContext, useEffect, useState } from "react";
import Button from "../componentes/Button";
import Input from "../componentes/Input";
import { useInput } from "../hooks/useInput";
import { usePostAxios } from "../hooks/useAxios";
import AuthContext from "../contexts/AuthProvider";
import styled from "styled-components";
import { FindIdModal, FindPwModal } from "../modals/FindIdPw";
import { Default, Mobile } from "../componentes/MediaQueries";
import ModalContext from "../contexts/ModalProvider";

const apiurl = process.env.REACT_APP_URL;

const customLoginStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    position: "absolute",
    width: "559px",
    height: "400px",
    left: "calc(50% - 559px/2 + 0.5px)",
    top: "calc(50% - 419px/2 - 0.5px)",

    background: "#FFFFFF",
    borderRadius: "26px",
  },
};

const customLogOutStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    /* 마이페이지/탈퇴하기 */

    position: "absolute",
    width: "460px",
    height: "196px",
    left: "calc(50% - 460px/2)",
    top: "calc(50% - 196px/2)",

    background: "#FFFFFF",
    borderRadius: " 26px",
  },
};
const MobileLoginStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    position: "absolute",
    width: "88vw",
    height: "50vh",
    left: "calc(50% - 99vw/2 + 0.5px)",
    top: "calc(50% - 80vh/2 + 0.5px)",
    overflowX: "hidden",

    background: "#FFFFFF",
    borderRadius: "26px",
  },
};

const Title = styled.text`
  /* 로그인해주세요 */

  position: absolute;
  height: 30px;
  width: 230px;
  left: 30px;
  right: 377px;
  top: 40px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 100%;
  /* identical to box height, or 30px */

  color: #000000;
`;

const SubTitle = styled.text`
  /* 메아리서비스 이용을 위해 로그인해주세요. */

  position: absolute;
  width: 265px;
  height: 16px;
  left: 30px;
  top: 87px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 100%;
  /* identical to box height, or 16px */

  color: #666666;
`;

const EmailInput = styled(Input)`
  box-sizing: border-box;

  position: absolute;
  width: 529px;
  height: 65px;
  left: 30px;
  top: 133px;

  border: 1px solid #e3e3e3;
  border-radius: 16px;

  @media (max-width: 786px) {
    left: 20px;
    width: 90vw;
  }
`;

const PwInput = styled(EmailInput)`
  top: 213px;
`;

const LogButton = styled(Button)`
  position: absolute;
  height: 65px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  background: ${(props) => (props.$isfilled ? "#0CB46C" : "#EDEDED")};
  border-radius: 0px 0px 26px 26px;

  border: none;
`;

const LogText = styled.text`
  /* 로그인하기 */

  position: absolute;
  left: 0px;
  right: 0px;
  top: 23px;
  bottom: 22px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
  /* identical to box height, or 20px */
  text-align: center;

  color: ${(props) => (props.$isfilled ? "#FFFFFF" : "#b6b6b6")};
`;

const FindMenu = styled.div`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  position: absolute;
  width: 178px;
  height: 16px;
  left: 28px;
  top: 293px;

  background-color: "#FFFFFF";
`;
const FindBar = styled.text`
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
const FindId = styled(Button)`
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
const FindPw = styled(Button)`
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
  order: 2;
  flex-grow: 0;
`;

const Close = styled(Button)`
  position: absolute;
  height: 24px;
  width: 24px;
  left: 535px;
  right: 30px;
  top: 23px;
  background-color: transparent;
  border: none;

  @media (max-width: 786px) {
    top: 35px;
    left: 360px;
  }
`;

// modal 방식으로 구현예정
function Login({ closeModal, isModalOpen }) {
  const { isIdOpen, setIsIdOpen, isPwOpen, setIsPwOpen } =
    useContext(ModalContext);
  const id = useInput("");
  const password = useInput("");

  const onIdClick = () => {
    setIsIdOpen(true);
    closeModal();
  };
  const onPwClick = () => {
    setIsPwOpen(true);
    closeModal();
  };

  const { mutation } = usePostAxios("auth");

  const onSubmit = () => {
    //console.log(id.value, password.value);
    mutation.mutate({
      url: apiurl + "auth/login",
      method: "POST",
      data: {
        email: id.value,
        password: password.value,
      },
    });
    id.textClear();
    password.textClear();
    closeModal();
  };
  return (
    <>
      <Default>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customLoginStyles}
          contentLabel="Login"
        >
          <Title>로그인해주세요</Title>
          <SubTitle>메아리서비스 이용을 위해 로그인해주세요.</SubTitle>
          <form style={{ display: "flex", flexDirection: "column" }}>
            <EmailInput placeholder={"email"} {...id} />
            <PwInput placeholder={"password"} {...password} />
            <LogButton
              $isfilled={
                id.value !== "" && password.value !== "" ? true : false
              }
              onClick={onSubmit}
            >
              <LogText
                $isfilled={
                  id.value !== "" && password.value !== "" ? true : false
                }
              >
                로그인하기
              </LogText>
            </LogButton>
          </form>
          <FindMenu>
            <FindId onClick={onIdClick}>아이디찾기</FindId>
            <FindBar>|</FindBar>
            <FindPw onClick={onPwClick}>비밀번호찾기</FindPw>
          </FindMenu>
          <Close onClick={closeModal}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
                fill="black"
              />
            </svg>
          </Close>
        </Modal>
      </Default>

      {/** 모바일 로그인 모달 */}
      <Mobile>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={MobileLoginStyles}
          contentLabel="MobileLogin"
        >
          <Title>로그인해주세요</Title>
          <SubTitle>메아리서비스 이용을 위해 로그인해주세요.</SubTitle>
          <form style={{ display: "flex", flexDirection: "column" }}>
            <EmailInput placeholder={"email"} {...id} />
            <PwInput placeholder={"password"} {...password} />
            <LogButton
              $isfilled={
                id.value !== "" && password.value !== "" ? true : false
              }
              onClick={onSubmit}
            >
              <LogText
                $isfilled={
                  id.value !== "" && password.value !== "" ? true : false
                }
              >
                로그인하기
              </LogText>
            </LogButton>
          </form>
          <FindMenu>
            <FindId onClick={onIdClick}>아이디찾기</FindId>
            {isIdOpen ? (
              <FindIdModal isIdOpen={isIdOpen} setIsIdOpen={setIsIdOpen} />
            ) : null}
            <FindBar>|</FindBar>
            <FindPw onClick={onPwClick}>비밀번호찾기</FindPw>
            {isPwOpen ? (
              <FindPwModal isPwOpen={isPwOpen} setIsPwOpen={setIsPwOpen} />
            ) : null}
          </FindMenu>
          <Close onClick={closeModal}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
                fill="black"
              />
            </svg>
          </Close>
        </Modal>
      </Mobile>
    </>
  );
}

const MobileLogOutStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "100vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    position: "absolute",
    width: "87vw",
    height: "25vh",
    left: "calc(50% - 98vw/2 + 0.5px)",
    top: "calc(50% - 40vh/2 + 0.5px)",
    overflowX: "hidden",

    background: "#FFFFFF",
    borderRadius: "26px",
  },
};
export const LogOutText = styled.text`
  /* 로그아웃하시겠습니까? */

  position: absolute;
  width: 460px;
  height: 22px;
  left: calc(50% - 460px / 2);
  top: 81px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 100%;
  /* identical to box height, or 22px */
  text-align: center;

  color: #000000;
  @media (max-width: 786px) {
    width: 100vw;
    left: calc(50% - 100vw / 2);
  }
`;
export const Cancle = styled(Button)`
  /* btn-lg */

  position: absolute;
  height: 65px;
  left: 0px;
  right: 50%;
  bottom: 0px;
  border: none;

  background: #ececec;
`;
export const CancleText = styled.text`
  /* 로그인하기 */

  position: absolute;
  left: 0px;
  right: 0px;
  top: 23px;
  bottom: 22px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
  /* identical to box height, or 20px */
  text-align: center;

  color: #1d1d1d;
`;
export const SubmitOut = styled(Button)`
  /* btn-lg */

  position: absolute;
  height: 65px;
  left: 50%;
  right: 0px;
  bottom: 0px;
  border: none;

  background: #0cb46c;
`;
export const OutText = styled.text`
  /* 로그아웃하기 */

  position: absolute;
  left: 0px;
  right: 0px;
  top: 23px;
  bottom: 22px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 100%;
  /* identical to box height, or 20px */
  text-align: center;

  color: #ffffff;
`;

function Logout({ closeModal, isModalOpen, setAuth }) {
  const onClick = () => {
    window.localStorage.removeItem("accessToken");
    setAuth(false);
    closeModal();
  };

  return (
    <>
      <Default>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customLogOutStyles}
          contentLabel="Logout"
        >
          <LogOutText>로그아웃 하시나요??</LogOutText>
          <Cancle onClick={closeModal}>
            <CancleText>취소하기</CancleText>
          </Cancle>
          <SubmitOut onClick={onClick}>
            <OutText>로그아웃</OutText>
          </SubmitOut>
        </Modal>
      </Default>

      {/** 모바일 로그아웃 */}
      <Mobile>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={MobileLogOutStyles}
          contentLabel="Logout"
        >
          <LogOutText>로그아웃 하시나요??</LogOutText>
          <Cancle onClick={closeModal}>
            <CancleText>취소하기</CancleText>
          </Cancle>
          <SubmitOut onClick={onClick}>
            <OutText>로그아웃</OutText>
          </SubmitOut>
        </Modal>
      </Mobile>
    </>
  );
}

function LogModal({ LoginOpen, setLoginOpen }) {
  const { auth, setAuth } = useContext(AuthContext);

  const openModal = () => {
    setLoginOpen(true);
  };

  const closeModal = () => {
    setLoginOpen(false);
  };
  useEffect(() => {
    openModal();
    console.log("로그인 오픈");
  }, []);

  return (
    <>
      {auth ? (
        <Logout
          closeModal={closeModal}
          isModalOpen={LoginOpen}
          setAuth={setAuth}
        />
      ) : (
        <Login closeModal={closeModal} isModalOpen={LoginOpen} />
      )}
    </>
  );
}

Modal.setAppElement("#root");

export default LogModal;
