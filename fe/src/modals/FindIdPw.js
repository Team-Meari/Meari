import Modal from "react-modal";
import styled from "styled-components";
import Button from "../componentes/Button";
import Input from "../componentes/Input";
import { useInput } from "../hooks/useInput";
import { useContext } from "react";
import { Default, Mobile } from "../componentes/MediaQueries";
import ModalContext from "../contexts/ModalProvider";
const url = process.env.REACT_APP_URL;
const apiurl = window.location.hostname === "localhost" ? url : "api/";

const customIdStyles = {
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
    /* 아이디찾기/disabled */

    position: "absolute",
    width: "569px",
    height: "403px",
    left: "calc(50% - 569px/2 + 0.5px)",
    top: "calc(50% - 403px/2 - 0.5px)",

    background: "#FFFFFF",
    borderRadius: "26px",
  },
};
const MobileIdStyles = {
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
    /* 아이디찾기/disabled */

    position: "absolute",
    width: "88vw",
    height: "50vh",
    left: "calc(50% - 99vw/2 + 0.5px)",
    top: "calc(50% - 80vh/2 - 0.5px)",
    overflow: "hidden",

    background: "#FFFFFF",
    borderRadius: "26px",
  },
};
const customPwStyles = {
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
    /* 아이디찾기/disabled */

    position: "absolute",
    width: "559px",
    height: "432px",
    left: "calc(50% - 559px/2 + 0.5px)",
    top: "calc(50% - 432px/2)",

    background: "#FFFFFF",
    borderRadius: "26px",
  },
};
const MobilePwStyles = {
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
    /* 아이디찾기/disabled */

    position: "absolute",
    width: "88vw",
    height: "50vh",
    left: "calc(50% - 99vw/2 + 0.5px)",
    top: "calc(50% - 80vh/2 - 0.5px)",
    overflow: "hidden",

    background: "#FFFFFF",
    borderRadius: "26px",
  },
};

const Title = styled.text`
  /* 아이디찾기 */

  position: absolute;
  width: 190px;
  height: 30px;
  left: 30px;
  right: 429px;
  top: 40px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 100%;
  /* identical to box height, or 30px */

  color: #000000;
`;
const Wrapper = styled.div`
  /* Frame 46 */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  position: absolute;
  width: 529px;
  height: 167px;
  left: 40px;
  top: 100px;

  @media (max-width: 786px) {
    left: 30px;
  }
`;
const Email = styled.div`
  /* input */

  width: 529px;
  height: 92px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;

  @media (max-width: 786px) {
    width: 90vw;
  }
`;
const Text = styled.div`
  /* Frame 41 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 3px;
  margin-bottom: 10px;
  //position: absolute;
  width: 59px;
  height: 18px;
  left: 10px;
  top: 0px;
`;
const Text1 = styled.text`
  /* 이메일 */

  width: 47px;
  height: 18px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
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
const Number = styled.div`
  /* input */

  width: 529px;
  height: 65px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  @media (max-width: 786px) {
    width: 90vw;
  }
`;
const EmailInput = styled(Input)`
  /* Frame 38 */

  box-sizing: border-box;

  //position: absolute;
  width: 386px;
  height: 65px;
  left: 0px;

  background: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 16px;
  @media (max-width: 786px) {
    width: 63vw;
  }
`;

const NumberInput = styled(EmailInput)``;
const EmailBtn = styled(Button)`
  /* Frame 44 */

  //position: absolute;
  width: 133px;
  height: 65px;
  margin-left: 10px;

  background: ${(props) => (props.$isfill ? "#0CB46C" : "#ededed")};
  color: ${(props) => (props.$isfill ? "#ffffff" : "#b6b6b6")};
  border-radius: 16px;
  border: none;

  @media (max-width: 786px) {
    width: 20vw;
  }
`;
const NumerBtn = styled(EmailBtn)``;

const Submit = styled(Button)`
  /* btn-lg */

  position: absolute;
  height: 65px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  background: ${(props) => (props.$isfill ? "#0CB46C" : "#ededed")};
  color: ${(props) => (props.$isfill ? "#ffffff" : "#b6b6b6")};
  border-radius: 0px 0px 26px 26px;
  border: none;
`;
const InsideText = styled.text`
  /* 중복확인 */

  width: 63px;
  height: 18px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  /* identical to box height, or 18px */
  text-align: center;
`;
const SubmitInside = styled(InsideText)`
  font-size: 20px;
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
    top: 35px;
    left: 360px;
  }
`;
export function FindIdModal({ isIdOpen, setIsIdOpen }) {
  const { setSuccessOpen } = useContext(ModalContext);
  const email = useInput("");
  const number = useInput("");
  const closeModal = () => {
    setIsIdOpen(false);
  };
  const onSubmit = () => {
    setSuccessOpen(true);
    closeModal();
  };
  return (
    <>
      <Default>
        <Modal
          isOpen={isIdOpen}
          onRequestClose={closeModal}
          style={customIdStyles}
          contentLabel="IdFind"
        >
          <Title>아이디찾기</Title>
          <Wrapper>
            <Email>
              <Text>
                <Text1>이메일</Text1>
                <Star>
                  <svg
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
                  </svg>
                </Star>
              </Text>
              <EmailInput placeholder={"email"} {...email}></EmailInput>
              <EmailBtn $isfill={email.value !== "" ? true : false}>
                <InsideText>인증받기</InsideText>
              </EmailBtn>
            </Email>
            <Number>
              <NumberInput
                placeholder={"인증번호를 입력해주세요"}
                {...number}
              ></NumberInput>
              <NumerBtn $isfill={number.value !== "" ? true : false}>
                <InsideText>확인</InsideText>
              </NumerBtn>
            </Number>
          </Wrapper>
          <Submit
            onClick={onSubmit}
            $isfill={email.value !== "" && number.value !== "" ? true : false}
          >
            <SubmitInside>아이디찾기</SubmitInside>
          </Submit>
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
      </Default>

      {/** 아이디 찾기 모바일 */}
      <Mobile>
        <Modal
          isOpen={isIdOpen}
          onRequestClose={closeModal}
          style={MobileIdStyles}
          contentLabel="IdFind"
        >
          <Title>아이디찾기</Title>
          <Wrapper>
            <Email>
              <Text>
                <Text1>이메일</Text1>
                <Star>
                  <svg
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
                  </svg>
                </Star>
              </Text>
              <EmailInput placeholder={"email"} {...email}></EmailInput>
              <EmailBtn $isfill={email.value !== "" ? true : false}>
                <InsideText>인증받기</InsideText>
              </EmailBtn>
            </Email>
            <Number>
              <NumberInput
                placeholder={"인증번호를 입력해주세요"}
                {...number}
              ></NumberInput>
              <NumerBtn $isfill={number.value !== "" ? true : false}>
                <InsideText>확인</InsideText>
              </NumerBtn>
            </Number>
          </Wrapper>
          <Submit
            onClick={onSubmit}
            $isfill={email.value !== "" && number.value !== "" ? true : false}
          >
            <SubmitInside>아이디찾기</SubmitInside>
          </Submit>
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
      </Mobile>
    </>
  );
}

const PwEmail = styled.div`
  /* input */

  position: absolute;
  width: 529px;
  height: 93px;
  left: 30px;
  top: 100px;
`;
const PwEmailInput = styled(Input)`
  /* Frame 38 */

  box-sizing: border-box;

  position: absolute;
  width: 529px;
  height: 65px;
  left: 0px;
  top: 28px;

  background: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 16px;

  @media (max-width: 786px) {
    width: 83vw;
  }
`;
const PwId = styled.div`
  /* input */

  position: absolute;
  width: 529px;
  height: 93px;
  left: 30px;
  top: 213px;
`;
const PwIdInput = styled(Input)`
  /* Frame 38 */

  box-sizing: border-box;

  position: absolute;
  width: 529px;
  height: 65px;
  left: 0px;
  top: 28px;

  background: #ffffff;
  border: 1px solid #e3e3e3;
  border-radius: 16px;

  @media (max-width: 786px) {
    width: 83vw;
  }
`;

export function FindPwModal({ isPwOpen, setIsPwOpen }) {
  const { setPwSuccessOpen } = useContext(ModalContext);
  const email = useInput("");
  const id = useInput("");
  const closeModal = () => {
    setIsPwOpen(false);
  };
  const onSubmit = () => {
    setPwSuccessOpen(true);
    closeModal();
  };
  return (
    <>
      <Default>
        <Modal
          isOpen={isPwOpen}
          onRequestClose={closeModal}
          style={customPwStyles}
          contentLabel="PwFind"
        >
          <Title>비밀번호찾기</Title>
          <PwEmail>
            <Text>
              <Text1>이메일</Text1>
              <Star>
                <svg
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
                </svg>
              </Star>
            </Text>
            <PwEmailInput placeholder={"email"} {...email}></PwEmailInput>
          </PwEmail>
          <PwId>
            <Text>
              <Text1>아이디</Text1>
              <Star>
                <svg
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
                </svg>
              </Star>
            </Text>
            <PwIdInput placeholder={"id"} {...id}></PwIdInput>
          </PwId>
          <Submit
            onClick={onSubmit}
            $isfill={email.value !== "" && id.value !== "" ? true : false}
          >
            <SubmitInside>비밀번호찾기</SubmitInside>
          </Submit>
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
      </Default>

      <Mobile>
        <Modal
          isOpen={isPwOpen}
          onRequestClose={closeModal}
          style={MobilePwStyles}
          contentLabel="PwFind"
        >
          <Title>비밀번호찾기</Title>
          <PwEmail>
            <Text>
              <Text1>이메일</Text1>
              <Star>
                <svg
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
                </svg>
              </Star>
            </Text>
            <PwEmailInput placeholder={"email"} {...email}></PwEmailInput>
          </PwEmail>
          <PwId>
            <Text>
              <Text1>아이디</Text1>
              <Star>
                <svg
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
                </svg>
              </Star>
            </Text>
            <PwIdInput placeholder={"id"} {...id}></PwIdInput>
          </PwId>
          <Submit
            onClick={onSubmit}
            $isfill={email.value !== "" && id.value !== "" ? true : false}
          >
            <SubmitInside>비밀번호찾기</SubmitInside>
          </Submit>
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
      </Mobile>
    </>
  );
}
