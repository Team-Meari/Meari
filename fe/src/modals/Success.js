import styled from "styled-components";
import Modal from "react-modal";
import Button from "../componentes/Button";
import { Default, Mobile } from "../componentes/MediaQueries";
import { useContext } from "react";
import ModalContext from "../contexts/ModalProvider";

const customSuccessStyles = {
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
    /* 아이디찾기/success */

    position: "absolute",
    width: "460px",
    height: "357px",
    left: "calc(50% - 460px/2)",
    top: "calc(50% - 357px/2 - 0.5px)",
    overflow: "hidden",
    background: "#FFFFFF",
    borderRadius: "26px",
  },
};

const MobileSuccessStyles = {
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
    /* 아이디찾기/success */

    position: "absolute",
    width: "88vw",
    height: "40vh",
    left: "calc(50% - 97vw/2)",
    top: "calc(50% - 60vh/2 - 0.5px)",
    overflow: "hidden",
    background: "#FFFFFF",
    borderRadius: "26px",
  },
};

const IconWrapper = styled.div`
  /* icon */

  position: absolute;
  width: 96px;
  height: 96px;
  left: calc(50% - 96px / 2);
  top: 73px;
`;
const Icon = styled.svg`
  /* Ellipse 5 */

  position: absolute;
  width: 70px;
  height: 70px;
  left: calc(50% - 70px / 2);
  top: calc(50% - 70px / 2);
`;
const Shadow = styled.svg`
  /* Ellipse 4 */

  position: absolute;
  width: 96px;
  height: 96px;
  left: calc(50% - 96px / 2);
  top: calc(50% - 96px / 2);
`;
const Svg = styled.svg`
  /* Vector 1 */

  position: absolute;
  width: 36.5px;
  height: 31.5px;
  left: 30px;
  top: 34px;
`;
const Text = styled.div`
  /* test1234! */

  position: absolute;
  width: 583px;
  height: 30px;
  left: calc(50% - 583px / 2);
  top: 189px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 100%;
  /* identical to box height, or 30px */
  text-align: center;

  color: #000000;
`;
const SubText = styled.text`
  /* 아이디찾기 성공! */

  position: absolute;
  width: 120px;
  height: 16px;
  left: calc(50% - 105px / 2 - 8px);
  top: 229px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */
  text-align: center;

  color: #666666;
`;
const LoginButton = styled(Button)`
  /* btn-lg */

  position: absolute;
  height: 65px;
  left: 50%;
  right: 0px;
  bottom: 0px;
  border: none;
  background: #0cb46c;
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

  color: #ffffff;
`;
const FindPwBtn = styled(Button)`
  /* btn-lg */

  position: absolute;
  height: 65px;
  left: 0px;
  right: 50%;
  bottom: 0px;
  border: none;
  background: #ececec;
`;
const BtnText = styled.text`
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
const Close = styled(Button)`
  position: absolute;
  height: 24px;
  width: 24px;
  left: 435px;
  right: 30px;
  top: 23px;
  background-color: transparent;
  border: none;
`;

export default function Success({ SuccessOpen, setSuccessOpen, isPw }) {
  const { LoginOpen, setIsIdOpen, setIsPwOpen, setLoginOpen } =
    useContext(ModalContext);
  const closeModal = () => {
    setSuccessOpen(false);
  };
  const onFindClick = () => {
    if (isPw) {
      setIsIdOpen(true);
      closeModal();
    } else {
      setIsPwOpen(true);
      closeModal();
    }
  };
  const onLoginClick = () => {
    setLoginOpen(true);
    closeModal();
  };
  return (
    <>
      <Default>
        <Modal
          isOpen={SuccessOpen}
          onRequestClose={closeModal}
          style={customSuccessStyles}
          contentLabel="Success"
        >
          <IconWrapper>
            <Shadow>
              <svg
                width="96"
                height="96"
                viewBox="0 0 96 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="48"
                  cy="48"
                  r="48"
                  fill="#0CB46C"
                  fill-opacity="0.1"
                ></circle>
              </svg>
            </Shadow>
            <Icon>
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="35" cy="35" r="35" fill="#0CB46C"></circle>
              </svg>
            </Icon>
            <Svg>
              <svg
                width="38"
                height="31"
                viewBox="0 0 38 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 17.5L14 27.5L34.5 3"
                  stroke="white"
                  stroke-width="6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Svg>
          </IconWrapper>
          <Text>test1234</Text>
          <SubText>{isPw ? "비밀번호찾기 성공!" : "아이디찾기 성공!"}</SubText>
          <FindPwBtn onClick={onFindClick}>
            <BtnText>{isPw ? "아이디찾기" : "비밀번호찾기"}</BtnText>
          </FindPwBtn>
          <LoginButton>
            <LogText onClick={onLoginClick}>로그인하기</LogText>
          </LoginButton>
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

      {/** 모바일 성공 화면 */}
      <Mobile>
        <Modal
          isOpen={SuccessOpen}
          onRequestClose={closeModal}
          style={MobileSuccessStyles}
          contentLabel="Success"
        >
          <IconWrapper>
            <Shadow>
              <svg
                width="96"
                height="96"
                viewBox="0 0 96 96"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="48"
                  cy="48"
                  r="48"
                  fill="#0CB46C"
                  fill-opacity="0.1"
                ></circle>
              </svg>
            </Shadow>
            <Icon>
              <svg
                width="70"
                height="70"
                viewBox="0 0 70 70"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="35" cy="35" r="35" fill="#0CB46C"></circle>
              </svg>
            </Icon>
            <Svg>
              <svg
                width="38"
                height="31"
                viewBox="0 0 38 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 17.5L14 27.5L34.5 3"
                  stroke="white"
                  stroke-width="6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Svg>
          </IconWrapper>
          <Text>test1234</Text>
          <SubText>{isPw ? "비밀번호찾기 성공!" : "아이디찾기 성공!"}</SubText>
          <FindPwBtn onClick={onFindClick}>
            <BtnText>{isPw ? "아이디찾기" : "비밀번호찾기"}</BtnText>
          </FindPwBtn>
          <LoginButton onClick={onLoginClick}>
            <LogText>로그인하기</LogText>
          </LoginButton>
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
