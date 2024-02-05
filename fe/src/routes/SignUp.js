import { useState } from "react";
import Input from "../componentes/Input";
import Button from "../componentes/Button";
import styles from "../css/SignUp.module.css";

function SignUp() {
  const onSubmit = () => {
    console.log("회원가입 완료");
  };
  return (
    <div className={styles.container}>
      <h1>Here is Sign up</h1>
      <form className={styles.form}>
        <text>이메일</text>
        <Input name={"email"} />
        <text>아이디</text>
        <Input name={"id"} />
        <text>비밀번호</text>
        <Input name={"password"} />
        <Button usage={"확인"} onClick={onSubmit} />
      </form>
    </div>
  );
}

export default SignUp;
