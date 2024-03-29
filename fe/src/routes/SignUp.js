import { useGetAxios, usePostAxios } from "../hooks/useAxios";
import Input from "../componentes/Input";
import Button from "../componentes/Button";
import styled from "styled-components";
import { useInput } from "../hooks/useInput";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Default, Mobile } from "../componentes/MediaQueries";
import Loading from "../componentes/Loading";

//const apiurl = process.env.REACT_APP_URL;
const apiurl =
  window.location.hostname === "localhost"
    ? "http://15.165.207.71:8080/"
    : "api/";

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
    width: "549px",
    height: "800px",
    left: "calc(50% - 549px/2 + 0.5px)",
    top: "calc(50% - 800px/2 + 0.5px)",
    background: " #FFFFFF",
    borderRadius: "26px",
  },
};
const customMobileStyles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.4)",
    width: "100%",
    height: "95vh",
    zIndex: "10",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    position: "absolute",
    width: "90vw",
    height: "95vh",
    left: "calc(50% - 100vw/2)",
    top: "calc(50% - 96vh/2)",
    overflowY: "scroll",
    overflowX: "hidden",
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

  position: absolute;
  width: 529px;
  height: 524px;
  left: 30px;
  top: 123px;

  @media (max-width: 786px) {
    width: 80vw;
  }
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

  @media (max-width: 786px) {
    width: 300px;
  }
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
  gap: 10px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;

  @media (max-width: 786px) {
    width: 80vw;
  }
`;
const IdInput = styled.div`
  height: 105px;
  order: 1;
  @media (max-width: 786px) {
    width: 80vw;
  }
`;
const PwInput = styled.div`
  height: 105px;
  order: 2;
  @media (max-width: 786px) {
    width: 80vw;
  }
`;
const NumberInput = styled(PwInput)``;
const PwConfirm = styled.div`
  ${EmailInput};
  height: 105px;
  order: 3;
  @media (max-width: 786px) {
    width: 87vw;
  }
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
const Star = styled.text`
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
  height: 55px;
  left: 0px;
  top: 28px;

  background: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 16px;

  @media (max-width: 786px) {
    width: 87vw;
  }
`;
const CustomIdInput = styled(CustomInput)`
  width: 386px;
  @media (max-width: 786px) {
    width: 60vw;
  }
`;
const CustomEmailInput = styled(CustomIdInput)``;
const IdConfirm = styled(Button)`
  /* Frame 44 */

  position: absolute;
  width: 133px;
  height: 55px;
  left: 396px;

  background: #0cb46c;
  border-radius: 16px;
  border: none;

  @media (max-width: 786px) {
    width: 105px;
    left: 255px;
  }
`;
const EmailConfirm = styled(IdConfirm)``;
const ConfirmText = styled.text`
  /* 중복확인 */

  position: absolute;
  width: 63px;
  height: 18px;
  left: calc(50% - 63px / 2);
  top: calc(50% - 18px / 2 - 0.5px);

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  /* identical to box height, or 18px */
  text-align: center;

  color: #ffffff;
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

  @media (max-width: 786px) {
    left: 365px;
  }
`;
const TermText = styled.text`
  /* 약관동의 */

  position: absolute;
  width: 63px;
  height: 18px;
  left: 30px;
  top: 630px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  /* identical to box height, or 18px */

  color: #1d1d1d;
  @media (max-width: 786px) {
    top: 637px;
  }
`;
const TermForm = styled.div`
  /* Frame 47 */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  gap: 12px;

  position: absolute;
  width: 500px;
  height: 95px;
  left: 30px;
  top: 650px;

  background: #f8f8f8;
  border-radius: 16px;

  @media (max-width: 786px) {
    width: 80vw;
    height: 85px;
    top: 667px;
  }
`;
const TermWrapper1 = styled.div`
  /* Frame 48 */

  width: 497px;
  height: 20px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const TermWrapper2 = styled(TermWrapper1)`
  /* Frame 52 */

  width: 499px;
  height: 18px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
`;
const TermWrapper3 = styled(TermWrapper1)`
  /* Frame 51 */

  width: 498px;
  height: 20px;

  /* Inside auto layout */
  flex: none;
  order: 2;
  flex-grow: 0;
`;
const TermSet = styled.div`
  /* Frame 49 */

  position: absolute;
  width: 181px;
  height: 25px;
`;
const CustomTerm = styled(Input)`
  /* 약관 전체동의 */

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  color: #1d1d1d;
`;
const Label1 = styled.label`
  /* 약관 전체동의 */

  position: absolute;
  width: 107px;
  height: 16px;
  left: 45px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 100%;
  /* identical to box height, or 16px */

  color: #1d1d1d;
`;
const Label2 = styled.label`
  /* 이용약관 동의(필수) */

  position: absolute;
  width: 190px;
  height: 16px;
  left: 30px;
  top: 2px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  color: #666666;
`;
const Detail = styled.text`
  /* 자세히보기 */

  position: absolute;
  width: 61px;
  height: 14px;
  right: 10px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */
  display: flex;
  align-items: center;
  text-decoration-line: underline;

  color: #666666;
`;

const SubMitBtn = styled(Button)`
  /* btn-lg */
  position: absolute;
  height: 65px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  background: ${(props) => (props.$isfilled ? "#0CB46C" : "#EDEDED")};
  border-radius: 0px 0px 26px 26px;
  border: none;

  @media (max-width: 786px) {
    display: flex;
    top: 790px;
  }
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
  const [emailText, setEmailText] = useState(" ");
  const [emailCheck, setEmailCheck] = useState(false);
  const [nickCheck, setNickCheck] = useState(false);
  const [nicknameText, setNicknameText] = useState(
    "5~16자 이내의 닉네임을 입력해주세요."
  );
  const email = useInput("");
  const nickname = useInput("");
  const number = useInput("");
  const password = useInput("");
  const pwConfirm = useInput("");

  const verifyNickname = useGetAxios(
    {
      url: apiurl + `members/verify-nickname/${nickname.value}`,
    },
    "verifyn"
  );
  const verifyEmail = useGetAxios(
    {
      url: apiurl + `members/verify-email/${email.value}`,
    },
    "verifye"
  );

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
  const onEmailVerify = () => {
    verifyEmail.refetch();
  };
  useEffect(() => {
    if (verifyEmail.error !== null) {
      setEmailText("중복된 이메일입니다!!");
      setEmailCheck(false);
    } else {
      if (email.value === "") {
        setEmailText("이메일을 입력해주세요.");
        setEmailCheck(false);
      } else {
        setEmailText("사용가능한 이메일입니다.");
        setEmailCheck(true);
      }
    }
  }, [verifyEmail, email.value]);

  const onNicknameVerify = () => {
    verifyNickname.refetch();
  };
  useEffect(() => {
    if (verifyNickname.error !== null) {
      setNicknameText("중복된 아이디입니다!!");
      setNickCheck(false);
    } else {
      if (nickname.value === "") {
        setNicknameText("아이디를 입력해주세요.");
        setNickCheck(false);
      } else {
        setNicknameText("사용가능한 아이디입니다.");
        setNickCheck(true);
      }
    }
  }, [verifyNickname, nickname.value]);

  return (
    <>
      <SignUpButton onClick={openModal}>회원가입</SignUpButton>
      <Default>
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
                  <ExText $widths={"37px"}>이메일</ExText>
                  <Star>*</Star>
                </Explain>
                <CustomEmailInput name={"email"} {...email} />
                <EmailConfirm onClick={onEmailVerify}>
                  <ConfirmText>중복확인</ConfirmText>
                </EmailConfirm>
                <IdHelper>
                  <ErrorSvg>
                    {!emailCheck ? (
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
                    ) : (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="19"
                          height="19"
                          rx="9.5"
                          fill="#0CB46C"
                        />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="19"
                          height="19"
                          rx="9.5"
                          stroke="#0CB46C"
                        />
                        <path
                          d="M9.1911 12.3869L14.3781 7.19995L15.1761 7.99795L9.1911 13.9829L5.6001 10.392L6.3981 9.59397L9.1911 12.3869Z"
                          fill="white"
                        />
                      </svg>
                    )}
                  </ErrorSvg>
                  <ErrorText>{emailText}</ErrorText>
                </IdHelper>
              </EmailInput>

              <IdInput>
                <Explain>
                  <ExText $widths={"37px"}>아이디</ExText>
                  <Star>*</Star>
                </Explain>
                <CustomIdInput name={"nickname"} {...nickname} />
                <IdConfirm onClick={onNicknameVerify}>
                  <ConfirmText>중복확인</ConfirmText>
                </IdConfirm>
                <IdHelper>
                  <ErrorSvg>
                    {!nickCheck ? (
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
                    ) : (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="19"
                          height="19"
                          rx="9.5"
                          fill="#0CB46C"
                        />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="19"
                          height="19"
                          rx="9.5"
                          stroke="#0CB46C"
                        />
                        <path
                          d="M9.1911 12.3869L14.3781 7.19995L15.1761 7.99795L9.1911 13.9829L5.6001 10.392L6.3981 9.59397L9.1911 12.3869Z"
                          fill="white"
                        />
                      </svg>
                    )}
                  </ErrorSvg>
                  <ErrorText>{nicknameText}</ErrorText>
                </IdHelper>
              </IdInput>

              <NumberInput>
                <Explain>
                  <ExText $widths={"55px"}>전화번호</ExText>
                  <Star>*</Star>
                </Explain>
                <CustomInput name={"phonenumber"} {...number} />
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
                  <ErrorText>정확한 전화번호를 입력해주세요</ErrorText>
                </PwHelper>
              </NumberInput>

              <PwInput>
                <Explain>
                  <ExText $widths={"49px"}>비밀번호</ExText>
                  <Star>*</Star>
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
                  <ExText $widths={"77px"}>비밀번호 확인</ExText>
                  <Star>*</Star>
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
            </Form>

            <TermText>약관동의</TermText>
            <TermForm>
              <TermWrapper1>
                <CustomTerm id="option1" type="radio"></CustomTerm>
                <Label1 for="option1">약관 전체동의</Label1>
              </TermWrapper1>

              <TermWrapper2>
                <TermSet>
                  <CustomTerm id="option2" type="radio"></CustomTerm>
                  <Label2 for="option2">이용약관 동의(필수)</Label2>
                </TermSet>

                <Detail>자세히보기</Detail>
              </TermWrapper2>

              <TermWrapper3>
                <TermSet>
                  <CustomTerm id="option3" type="radio"></CustomTerm>
                  <Label2 for="option3">개인정보취급방침 동의(필수)</Label2>
                </TermSet>
                <Detail>자세히보기</Detail>
              </TermWrapper3>
            </TermForm>

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
      </Default>
      {verifyEmail.isLoading ? <Loading /> : null}
      {/** 모바일 회원가입 양식 */}
      <Mobile>
        {isModalOpen ? (
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={customMobileStyles}
            contentLabel="Login"
          >
            <Title>회원가입</Title>
            <SubTitle>메아리서비스 이용을 위해 회원가입해주세요</SubTitle>
            <Form>
              <EmailInput>
                <Explain>
                  <ExText $widths={"37px"}>이메일</ExText>
                  <Star>*</Star>
                </Explain>
                <CustomEmailInput name={"email"} {...email} />
                <EmailConfirm onClick={onEmailVerify}>
                  <ConfirmText>중복확인</ConfirmText>
                </EmailConfirm>
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
                  <ErrorText>{emailText}</ErrorText>
                </IdHelper>
              </EmailInput>

              <IdInput>
                <Explain>
                  <ExText $widths={"37px"}>아이디</ExText>
                  <Star>*</Star>
                </Explain>
                <CustomIdInput name={"nickname"} {...nickname} />
                <IdConfirm onClick={onNicknameVerify}>
                  <ConfirmText>중복확인</ConfirmText>
                </IdConfirm>
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
                  <ErrorText>{nicknameText}</ErrorText>
                </IdHelper>
              </IdInput>

              <NumberInput>
                <Explain>
                  <ExText $widths={"55px"}>전화번호</ExText>
                  <Star>*</Star>
                </Explain>
                <CustomInput name={"phonenumber"} {...number} />
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
                  <ErrorText>정확한 전화번호를 입력해주세요</ErrorText>
                </PwHelper>
              </NumberInput>

              <PwInput>
                <Explain>
                  <ExText $widths={"49px"}>비밀번호</ExText>
                  <Star>*</Star>
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
                  <ExText $widths={"77px"}>비밀번호 확인</ExText>
                  <Star>*</Star>
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
            </Form>

            <TermText>약관동의</TermText>
            <TermForm>
              <TermWrapper1>
                <CustomTerm id="option1" type="radio"></CustomTerm>
                <Label1 for="option1">약관 전체동의</Label1>
              </TermWrapper1>

              <TermWrapper2>
                <TermSet>
                  <CustomTerm id="option2" type="radio"></CustomTerm>
                  <Label2 for="option2">이용약관 동의(필수)</Label2>
                </TermSet>

                <Detail>자세히보기</Detail>
              </TermWrapper2>

              <TermWrapper3>
                <TermSet>
                  <CustomTerm id="option3" type="radio"></CustomTerm>
                  <Label2 for="option3">개인정보취급방침 동의(필수)</Label2>
                </TermSet>
                <Detail>자세히보기</Detail>
              </TermWrapper3>
            </TermForm>

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
      </Mobile>
    </>
  );
}

export default SignUp;
