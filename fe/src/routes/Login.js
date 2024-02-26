import Modal from "react-modal";
import { useContext, useState } from "react";
import Button from "../componentes/Button";
import Input from "../componentes/Input";
import { useInput } from "../hooks/useInput";
import { usePostAxios } from "../hooks/useAxios";
import AuthContext from "../contexts/AuthProvider";

const apiurl = process.env.REACT_APP_URL;

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
  const id = useInput("");
  const password = useInput("");

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
        <h1>Hi It's Logout</h1>
        <Button usage={"LogOut"} onClick={onClick}></Button>
        <Button usage={"CLOSE"} onClick={closeModal}></Button>
      </Modal>
    </>
  );
}

function LogModal() {
  const { auth, setAuth } = useContext(AuthContext);
  const { openModal, closeModal, isModalOpen } = useModal();

  return (
    <>
      <Button onClick={openModal} usage={auth ? "로그아웃" : "로그인"} />
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
