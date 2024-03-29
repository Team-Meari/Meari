import Modal from "react-modal";
import { usePostAxios } from "../hooks/useAxios";
import styled from "styled-components";
import { Cancle, CancleText, OutText, SubmitOut } from "../routes/Login";
import { Default, Mobile } from "../componentes/MediaQueries";

//const apiurl = process.env.REACT_APP_URL;
const apiurl =
  window.location.hostname === "localhost"
    ? "http://15.165.207.71:8080/"
    : "api/";

const customCofirmStyles = {
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
    /* 마이페이지/탈퇴하기 */

    position: "absolute",
    width: "460px",
    height: "249px",
    left: "calc(50% - 460px/2)",
    top: "calc(50% - 249px/2 + 0.5px)",

    background: "#FFFFFF",
    borderRadius: "26px",
  },
};
const MobileCofirmStyles = {
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
    /* 마이페이지/탈퇴하기 */

    position: "absolute",
    width: "88vw",
    height: "30vh",
    left: "calc(50% - 99vw/2)",
    top: "calc(50% - 50vh/2 + 0.5px)",
    overflow: "hidden",

    background: "#FFFFFF",
    borderRadius: "26px",
  },
};
const Title = styled.text`
  /* 회원탈퇴하시겠습니까? */

  position: absolute;
  width: 460px;
  height: 22px;
  left: calc(50% - 460px / 2);
  top: 81px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 100%;
  /* identical to box height, or 22px */
  text-align: center;

  color: #000000;
`;
const SubTitle = styled.text`
  /* 탈퇴하고 다시 가입하더라도 기존의 작성한 글은 복구되지 않습니다. */

  position: absolute;
  width: 220px;
  height: 38px;
  left: calc(50% - 220px / 2 - 1px);
  top: 118px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  /* or 19px */
  text-align: center;

  color: #666666;
`;
const Cancel = styled(Cancle)``;
const Submit = styled(SubmitOut)``;

export default function SignOutConfirm({
  SignOutOpen,
  setSignOutOpen,
  setAuth,
  memberId,
}) {
  const { mutation } = usePostAxios("userdata");
  // 회원탈퇴 버튼 클릭 시 회원탈퇴하는 로직
  const onClick = () => {
    let result = window.confirm("정말 회원탈퇴 하시겠습니까???");
    if (result) {
      mutation.mutate({
        url: apiurl + `members/${memberId}`,
        method: "DELETE",
      });
      setAuth(false);
      console.log("회원탈퇴 되었습니다.");
    } else {
      console.log("회원탈퇴 취소되었습니다.");
    }
    closeModal();
  };

  const closeModal = () => {
    setSignOutOpen(false);
  };
  return (
    <>
      <Default>
        <Modal
          isOpen={SignOutOpen}
          onRequestClose={closeModal}
          style={customCofirmStyles}
          contentLabel="Confirm"
        >
          <Title>회원탈퇴하시겠습까?</Title>
          <SubTitle>
            탈퇴하고 다시 가입하더라도 기존의 작성한 글은 복구되지 않습니다.
          </SubTitle>
          <Cancel>
            <CancleText onClick={closeModal}>취소하기</CancleText>
          </Cancel>
          <Submit>
            <OutText onClick={onClick}>탈퇴하기</OutText>
          </Submit>
        </Modal>
      </Default>

      {/** 모바일 회원탈퇴 화면 */}
      <Mobile>
        <Modal
          isOpen={SignOutOpen}
          onRequestClose={closeModal}
          style={MobileCofirmStyles}
          contentLabel="Confirm"
        >
          <Title>회원탈퇴하시겠습까?</Title>
          <SubTitle>
            탈퇴하고 다시 가입하더라도 기존의 작성한 글은 복구되지 않습니다.
          </SubTitle>
          <Cancel>
            <CancleText onClick={closeModal}>취소하기</CancleText>
          </Cancel>
          <Submit>
            <OutText onClick={onClick}>탈퇴하기</OutText>
          </Submit>
        </Modal>
      </Mobile>
    </>
  );
}
