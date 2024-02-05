import Modal from "react-modal";
import { useState } from "react";
import Button from "../componentes/Button";
import Input from "../componentes/Input";
import { useInput } from "../hooks/useInput";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

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
function Login({ closeModal, isModalOpen, setisLogin }) {
  const id = useInput("");
  const password = useInput("");
  const onSubmit = () => {
    setisLogin(true);
    console.log(id.value, password.value);
    // 이제 로그인 클릭시
    // 1. 로그인 API 통신 로직 필요
    // 2. 로그인 정보 저장하는 로직 필요
    closeModal();
  };
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Login"
      >
        <h1>Hi It's Login</h1>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <Input placeholder={"id"} {...id} />
          <Input placeholder={"password"} {...password} />
          <Button usage={"로그인"} onClick={onSubmit} />
        </form>
        <Button usage={"CLOSE"} onClick={closeModal}></Button>
      </Modal>
    </div>
  );
}

function Logout({ closeModal, isModalOpen, setisLogin }) {
  const onClick = () => {
    setisLogin(false);
    // 로그아웃하는 로직 추가 필요
    closeModal();
  };
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Logout"
      >
        <h1>Hi It's Logout</h1>
        <Button usage={"LogOut"} onClick={onClick}></Button>
        <Button usage={"CLOSE"} onClick={closeModal}></Button>
      </Modal>
    </div>
  );
}

function LogModal() {
  const [isLogin, setisLogin] = useState(false);
  const { openModal, closeModal, isModalOpen } = useModal();

  return (
    <>
      <Button onClick={openModal} usage={isLogin ? "로그아웃" : "로그인"} />
      {isLogin ? (
        <Logout
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          setisLogin={setisLogin}
        />
      ) : (
        <Login
          closeModal={closeModal}
          isModalOpen={isModalOpen}
          setisLogin={setisLogin}
        />
      )}
    </>
  );
}

Modal.setAppElement("#root");

export default LogModal;