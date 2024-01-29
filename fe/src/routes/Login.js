import Modal from "react-modal";
import { useState } from "react";
import Button from "../componentes/Button";
import Input from "../componentes/Input";

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
function Login({ closeModal, isModalOpen }) {
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
          <Input placeholder={"id"} />
          <Input placeholder={"password"} />
        </form>
        <Button usage={"CLOSE"} onClick={closeModal}></Button>
      </Modal>
    </div>
  );
}

function Logout({ closeModal, isModalOpen }) {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Logout"
      >
        <h1>Hi It's Logout</h1>
        <Button usage={"LogOut"} onClick={closeModal}></Button>
        <Button usage={"CLOSE"} onClick={closeModal}></Button>
      </Modal>
    </div>
  );
}

function LogModal() {
  const [isLogin, setisLogin] = useState(false);
  const { openModal, closeModal, isModalOpen } = useModal();

  return (
    <div>
      <Button onClick={openModal} usage={"로그인"} />
      {isLogin ? (
        <Logout closeModal={closeModal} isModalOpen={isModalOpen} />
      ) : (
        <Login closeModal={closeModal} isModalOpen={isModalOpen} />
      )}
    </div>
  );
}

Modal.setAppElement("#root");

export default LogModal;
