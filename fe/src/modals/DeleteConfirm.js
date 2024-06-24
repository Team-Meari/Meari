import styled from "styled-components";
import Modal from "react-modal";
import Button from "../componentes/Button";
import { Default, Mobile } from "../componentes/MediaQueries";

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
  width: 150px;
  height: 16px;
  left: calc(50% - 132px / 2 - 8px);
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
const CofirmButton = styled(Button)`
  position: absolute;
  height: 65px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  background: #0cb46c;
  border-radius: 0px 0px 26px 26px;

  border: none;
`;

const CofrimText = styled.text`
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

export default function DeleteConfirm({ isErrorOpen, setErrorOpen }) {
  const closeModal = () => {
    setErrorOpen(false);
  };
  const onClick = () => {
    closeModal();
  };
  return (
    <>
      <Default>
        <Modal
          isOpen={isErrorOpen}
          onRequestClose={closeModal}
          style={customSuccessStyles}
          contentLabel="Error"
        >
          <IconWrapper>
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
                fill="#AEAEAE"
                fill-opacity="0.1"
              />
              <circle cx="48" cy="48" r="35" fill="#AEAEAE" />
              <path
                d="M49 32L49 54"
                stroke="white"
                stroke-width="6"
                stroke-linecap="round"
              />
              <circle cx="49" cy="63" r="3" fill="white" />
            </svg>
          </IconWrapper>
          <Text>문제가 있어요!</Text>
          <SubText>관리팀에 문의해 주세요</SubText>

          <CofirmButton onClick={onClick}>
            <CofrimText>확인</CofrimText>
          </CofirmButton>
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
          isOpen={isErrorOpen}
          onRequestClose={closeModal}
          style={MobileSuccessStyles}
          contentLabel="Error"
        >
          <IconWrapper>
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
                fill="#AEAEAE"
                fill-opacity="0.1"
              />
              <circle cx="48" cy="48" r="35" fill="#AEAEAE" />
              <path
                d="M49 32L49 54"
                stroke="white"
                stroke-width="6"
                stroke-linecap="round"
              />
              <circle cx="49" cy="63" r="3" fill="white" />
            </svg>
          </IconWrapper>
          <Text>에러</Text>
          <SubText>{"문제가 있어요!"}</SubText>
          <CofirmButton onClick={onClick}>
            <CofrimText>확인</CofrimText>
          </CofirmButton>
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
