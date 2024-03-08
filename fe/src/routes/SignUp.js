import { usePostAxios } from "../hooks/useAxios";
import Input from "../componentes/Input";
import Button from "../componentes/Button";
import styled from "styled-components";
import { useInput } from "../hooks/useInput";
import { useNavigate } from "react-router-dom";

const apiurl = process.env.REACT_APP_URL;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 100dvh;
  min-width: 100vw;
  position: relative;
  background-color: beige;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: (-50%, -50%);
  margin-top: 200px;
`;

function SignUp() {
  const navigate = useNavigate();
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
    navigate(-1);
    console.log("회원가입 완료");
  };

  return (
    <Wrapper>
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
      <Button
        usage={"되돌아가기"}
        onClick={() => {
          navigate(-1);
        }}
      />
    </Wrapper>
  );
}

export default SignUp;
