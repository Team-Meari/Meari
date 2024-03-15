import Modal from "react-modal";
import { useContext, useState } from "react";
import Button from "../componentes/Button";
import Input from "../componentes/Input";
import { useInput } from "../hooks/useInput";
import { usePostAxios } from "../hooks/useAxios";
import AuthContext from "../contexts/AuthProvider";
import styled from "styled-components";

const apiurl = process.env.REACT_APP_URL;

const customStyles = {
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
    height: "419px",
    left: "calc(50% - 559px/2 + 0.5px)",
    top: "calc(50% - 419px/2 - 0.5px)",

    background: "#FFFFFF",
    borderRadius: "26px",
  },
};

const LoginButton = styled.text`
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
  order: 0;
  flex-grow: 0;
`;

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

const Close = styled(Button)`
  position: absolute;
  height: 24px;
  width: 24px;
  left: 535px;
  right: 30px;
  top: 23px;
  background-color: transparent;
  border: none;
`;

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    return { isModalOpen };
  }

  return { openModal, closeModal, isModalOpen };
};

// modal 방식으로 구현예정
function Login({ closeModal, isModalOpen }) {
  const id = useInput("");
  const password = useInput("");

  const { mutation } = usePostAxios("auth");

  const onSubmit = () => {
    //console.log(id.value, password.value);
    mutation.mutate({
      url: apiurl + "members/login",
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login"
      >
        <Title>로그인해주세요</Title>
        <SubTitle>메아리서비스 이용을 위해 로그인해주세요.</SubTitle>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <EmailInput placeholder={"email"} {...id} />
          <PwInput placeholder={"password"} {...password} />
          <LogButton
            $isfilled={id.value !== "" && password.value !== "" ? true : false}
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
    </>
  );
}

function Logout({ closeModal, isModalOpen, setAuth }) {
  const onClick = () => {
    window.localStorage.removeItem("accessToken");
    setAuth(false);
    closeModal();
  };
  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Logout"
      >
        <Title>로그아웃 하시나요??</Title>
        <Button usage={"LogOut"} onClick={onClick}></Button>
        <Button usage={"CLOSE"} onClick={closeModal}></Button>
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
    </>
  );
}

function LogModal() {
  const { auth, setAuth } = useContext(AuthContext);
  const { openModal, closeModal, isModalOpen } = useModal();

  return (
    <>
      <LoginButton onClick={openModal}>
        {auth ? "로그아웃" : "로그인"}
      </LoginButton>
      {auth ? (
        <Logout
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          setAuth={setAuth}
        />
      ) : (
        <Login closeModal={closeModal} isModalOpen={isModalOpen} />
      )}
    </>
  );
}

Modal.setAppElement("#root");

export default LogModal;
