import { useState } from "react";
import { usePostAxios } from "../hooks/useAxios";
import Input from "../componentes/Input";
import Button from "../componentes/Button";
import styles from "../css/SignUp.module.css";
import { useInput } from "../hooks/useInput";

const apiurl = process.env.REACT_APP_URL;

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
    <div className={styles.container}>
      <h1>Here is Sign up</h1>
      <form className={styles.form}>
        이메일
        <Input name={"email"} {...email} />
        아이디
        <Input name={"nickname"} {...nickname} />
        비밀번호
        <Input name={"password"} {...password} />
        <Button usage={"확인"} onClick={onSubmit} />
      </form>
    </div>
  );
}

export default SignUp;
