import { usePostAxios } from "../hooks/useAxios";
import Input from "../componentes/Input";
import Button from "../componentes/Button";
import styled from "styled-components";
import { useInput } from "../hooks/useInput";
import { useState } from "react";
import Modal from "react-modal";

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
    width: "589px",
    height: "897px",
    left: "calc(50% - 589px/2 + 0.5px)",
    top: "calc(50% - 897px/2 + 0.5px)",

    background: " #FFFFFF",
    borderRadius: "26px",
  },
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: (-50%, -50%);
  margin-top: 200px;
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

const SignUpButton = styled.text`
  width: 70px;
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

function SignUp() {
  const { openModal, closeModal, isModalOpen } = useModal();
  const email = useInput("");
  const nickname = useInput("");
  const password = useInput("");

  const { mutation } = usePostAxios("userdata");

  const onSubmit = () => {
    mutation.mutate({
      url: apiurl + "members",
      method: "POST",
      data: {
        email: email.value,
        password: password.value,
        nickname: nickname.value,
      },
    });
    console.log(email.value, password.value, nickname.value);
    closeModal();
    console.log("회원가입 완료");
  };

  return (
    <>
      <SignUpButton onClick={openModal}>회원가입</SignUpButton>
      {isModalOpen ? (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Login"
        >
          <Form>
            <h1>Here is Sign up</h1>
            이메일
            <Input name={"email"} {...email} />
            아이디
            <Input name={"nickname"} {...nickname} />
            비밀번호
            <Input name={"password"} {...password} />
            <Button usage={"확인"} onClick={onSubmit} />
          </Form>

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
      ) : null}
    </>
  );
}

export default SignUp;
