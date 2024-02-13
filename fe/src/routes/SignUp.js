import { usePostAxios } from "../hooks/useAxios";
import Input from "../componentes/Input";
import Button from "../componentes/Button";
import styled from "styled-components";
import { useInput } from "../hooks/useInput";

const apiurl = process.env.REACT_APP_URL;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100dvh;
  position: relative;
  background-color: beige;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: (-50%, -50%);
`;

function SignUp() {
  const email = useInput("");
  const nickname = useInput("");
  const password = useInput("");

  const { error, loading, sendPost } = usePostAxios({
    url: apiurl + "members",
    method: "POST",
    data: {
      email: email.value,
      password: password.value,
      nickname: nickname.value,
    },
  });

  const onSubmit = () => {
    sendPost();
    console.log(email.value, password.value, nickname.value);
    console.log("회원가입 완료");
  };

  return (
    <Wrapper>
      <h1>Here is Sign up</h1>
      <Form>
        이메일
        <Input name={"email"} {...email} />
        아이디
        <Input name={"nickname"} {...nickname} />
        비밀번호
        <Input name={"password"} {...password} />
        <Button usage={"확인"} onClick={onSubmit} />
      </Form>
    </Wrapper>
  );
}

export default SignUp;
