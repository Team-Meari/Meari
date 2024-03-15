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
    height: "800px",
    left: "calc(50% - 589px/2 + 0.5px)",
    top: "calc(50% - 800px/2 + 0.5px)",

    background: " #FFFFFF",
    borderRadius: "26px",
  },
};

const Form = styled.form`
  /* Frame 45 */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  position: absolute;
  width: 529px;
  height: 524px;
  left: 30px;
  top: 123px;
`;

const Title = styled.text`
  /* 회원가입 */

  position: absolute;
  height: 30px;
  left: 30px;
  right: 455px;
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
  /* 메아리서비스 이용을 위해 회원가입해주세요. */

  position: absolute;
  width: 350px;
  height: 16px;
  left: 30px;
  top: 80px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  color: #666666;
`;

const EmailInput = styled.div`
  /* input */

  width: 529px;
  height: 99px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const IdInput = styled(EmailInput)`
  height: 105px;
  order: 1;
`;

const PwInput = styled.div`
  height: 105px;
  order: 2;
`;

const PwConfirm = styled.div`
  height: 105px;
  order: 3;
`;

const Explain = styled.div`
  /* Frame 41 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 3px;

  width: 59px;
  height: 18px;
  left: 10px;
  top: 0px;
`;

const ExText = styled.text`
  /* 이메일 */

  width: ${(props) => (props.$widths ? props.$widths : "47px")};
  height: 18px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 18px */

  color: #1d1d1d;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const Star = styled.svg`
  /* * */

  width: 9px;
  height: 18px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  /* identical to box height, or 18px */

  color: #ff2828;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const CustomInput = styled(Input)`
  /* Frame 38 */

  box-sizing: border-box;

  /* position: absolute; */
  width: 529px;
  height: 45px;
  left: 0px;
  top: 28px;

  background: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 16px;
`;

const HelperText = styled.div`
  /* Frame 40 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 5px;

  width: 310px;
  height: 16px;
`;

const IdHelper = styled.div`
  /* Frame 43 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 5px;

  width: 310px;
  height: 16px;
  left: 10px;
  top: 103px;
`;

const PwHelper = styled(IdHelper)`
  width: 222px;
`;
const ConfirmHelper = styled(IdHelper)`
  width: 189px;
`;

const ErrorSvg = styled.svg`
  /* error-warning-fill */

  width: 16px;
  height: 16px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const ErrorText = styled.text`
  /* 이메일을 입력해주세요. */

  width: 289px;
  height: 14px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */

  color: #ff2828;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
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

const SubMitBtn = styled(Button)`
  /* btn-lg */
  width: 559px;
  top: 635px;

  position: absolute;
  height: 65px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  background: ${(props) => (props.$isfilled ? "#0CB46C" : "#EDEDED")};
  border-radius: 0px 0px 26px 26px;
  border: none;
`;

const SubMitText = styled.text`
  /* 회원가입하기 */

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

const SignUpButton = styled.text`
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
  const pwConfirm = useInput("");

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
          <Title>회원가입</Title>
          <SubTitle>메아리서비스 이용을 위해 회원가입해주세요</SubTitle>
          <Form>
            <EmailInput>
              <Explain>
                <ExText>이메일</ExText>
                <Star
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.636 7.42L3.744 4.72L1.44 6.16L0.828 5.116L3.24 3.856L0.828 2.596L1.44 1.516L3.744 2.992L3.636 0.256H4.86L4.752 2.992L7.056 1.516L7.632 2.596L5.22 3.856L7.632 5.116L7.056 6.16L4.752 4.72L4.86 7.42H3.636Z"
                    fill="#FF2828"
                  />
                </Star>
              </Explain>
              <CustomInput name={"email"} {...email} />
              <HelperText>HelperText</HelperText>
            </EmailInput>
            <IdInput>
              <Explain>
                <ExText>아이디</ExText>
                <Star
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.636 7.42L3.744 4.72L1.44 6.16L0.828 5.116L3.24 3.856L0.828 2.596L1.44 1.516L3.744 2.992L3.636 0.256H4.86L4.752 2.992L7.056 1.516L7.632 2.596L5.22 3.856L7.632 5.116L7.056 6.16L4.752 4.72L4.86 7.42H3.636Z"
                    fill="#FF2828"
                  />
                </Star>
              </Explain>
              <CustomInput name={"nickname"} {...nickname} />
              <IdHelper>
                <ErrorSvg>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.00016 13.6667C3.31826 13.6667 0.333496 10.6819 0.333496 7.00004C0.333496 3.31814 3.31826 0.333374 7.00016 0.333374C10.682 0.333374 13.6668 3.31814 13.6668 7.00004C13.6668 10.6819 10.682 13.6667 7.00016 13.6667ZM6.3335 9.00004V10.3334H7.66683V9.00004H6.3335ZM6.3335 3.66671V7.66671H7.66683V3.66671H6.3335Z"
                      fill="#FF2828"
                    />
                  </svg>
                </ErrorSvg>
                <ErrorText>
                  아이디는 최소 8자 최대16자 이내로 입력해 주십시오.
                </ErrorText>
              </IdHelper>
            </IdInput>
            <PwInput>
              <Explain>
                <ExText $widths={"63px"}>비밀번호</ExText>
                <Star
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.636 7.42L3.744 4.72L1.44 6.16L0.828 5.116L3.24 3.856L0.828 2.596L1.44 1.516L3.744 2.992L3.636 0.256H4.86L4.752 2.992L7.056 1.516L7.632 2.596L5.22 3.856L7.632 5.116L7.056 6.16L4.752 4.72L4.86 7.42H3.636Z"
                    fill="#FF2828"
                  />
                </Star>
              </Explain>
              <CustomInput name={"password"} {...password} />
              <PwHelper>
                <ErrorSvg>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.00016 13.6667C3.31826 13.6667 0.333496 10.6819 0.333496 7.00004C0.333496 3.31814 3.31826 0.333374 7.00016 0.333374C10.682 0.333374 13.6668 3.31814 13.6668 7.00004C13.6668 10.6819 10.682 13.6667 7.00016 13.6667ZM6.3335 9.00004V10.3334H7.66683V9.00004H6.3335ZM6.3335 3.66671V7.66671H7.66683V3.66671H6.3335Z"
                      fill="#FF2828"
                    />
                  </svg>
                </ErrorSvg>
                <ErrorText>영문+숫자 비밀번호를 입력해주세요.</ErrorText>
              </PwHelper>
            </PwInput>
            <PwConfirm>
              <Explain>
                <ExText $widths={"98px"}>비밀번호 확인</ExText>
                <Star
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.636 7.42L3.744 4.72L1.44 6.16L0.828 5.116L3.24 3.856L0.828 2.596L1.44 1.516L3.744 2.992L3.636 0.256H4.86L4.752 2.992L7.056 1.516L7.632 2.596L5.22 3.856L7.632 5.116L7.056 6.16L4.752 4.72L4.86 7.42H3.636Z"
                    fill="#FF2828"
                  />
                </Star>
              </Explain>
              <CustomInput name={"pwconfirm"} {...pwConfirm} />
              <ConfirmHelper>
                <ErrorSvg>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.00016 13.6667C3.31826 13.6667 0.333496 10.6819 0.333496 7.00004C0.333496 3.31814 3.31826 0.333374 7.00016 0.333374C10.682 0.333374 13.6668 3.31814 13.6668 7.00004C13.6668 10.6819 10.682 13.6667 7.00016 13.6667ZM6.3335 9.00004V10.3334H7.66683V9.00004H6.3335ZM6.3335 3.66671V7.66671H7.66683V3.66671H6.3335Z"
                      fill="#FF2828"
                    />
                  </svg>
                </ErrorSvg>
                <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
              </ConfirmHelper>
            </PwConfirm>

            <SubMitBtn
              $isfilled={
                email.value !== "" &&
                nickname.value !== "" &&
                password.value !== "" &&
                pwConfirm.value !== ""
              }
              onClick={onSubmit}
            >
              <SubMitText
                $isfilled={
                  email.value !== "" &&
                  nickname.value !== "" &&
                  password.value !== "" &&
                  pwConfirm.value !== ""
                }
              >
                회원가입하기
              </SubMitText>
            </SubMitBtn>
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
