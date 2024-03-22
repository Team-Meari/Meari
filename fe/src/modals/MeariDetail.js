import styled from "styled-components";
import Button from "../componentes/Button";
import Modal from "react-modal";

const customDetailStyles = {
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
    /* 로그인해주세요. */

    /* Auto layout */
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: " 40px 0px 0px",
    gap: "30px",

    width: " 650px",
    height: "395px",
    left: "calc(50% - 650px/2)",
    top: "calc(50% - 395px/2 + 0.5px)",
    overflow: "hidden",
    background: "#FFFFFF",
    borderRadius: "26px",
  },
};
const Wrapper = styled.div`
  /* Frame 67 */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 30px;
  gap: 20px;

  width: 650px;
  height: 260px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const Content = styled.text`
  width: 590px;
  height: 160px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 160%;
  /* or 32px */

  color: #1d1d1d;

  word-break: break-all;
  text-overflow: ellipsis;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const SubContent = styled.div`
  /* Frame 70 */

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  padding: 25px 0px 0px;
  gap: 15px;

  width: 590px;
  height: 80px;

  border-top: 1px solid #e3e3e3;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
`;
const SubText1 = styled.div`
  /* Frame 68 */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 590px;
  height: 20px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const SubText2 = styled.div`
  /* Frame 69 */
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 590px;
  height: 20px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
`;
const Explain = styled.text`
  /* 작성위치 */

  width: 63px;
  height: 18px;
  left: 0px;
  top: 0px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  /* identical to box height, or 18px */

  color: #666666;
`;
const Detail = styled.text`
  /* 서울 테헤란로 1234 */

  width: 144px;
  height: 18px;
  right: 0px;
  top: 0px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  /* identical to box height, or 18px */
  text-align: right;

  color: #1d1d1d;
`;
const RemoveBtn = styled(Button)`
  /* btn-lg */

  position: absolute;
  width: 50%;
  height: 65px;
  left: 0px;
  right: 325px;
  bottom: 0px;
  border: none;
  background: #ececec;
`;
const Close = styled(Button)`
  /* btn-lg */

  position: absolute;
  width: 50%;
  height: 65px;
  right: 0px;
  bottom: 0px;
  border: none;
  background: #0cb46c;
`;
const BtnText = styled.text`
  /* 로그인하기 */

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

  color: #1d1d1d;
`;

export default function MeariDetail({
  isDetailOpen,
  setDetailOpen,
  value,
  author,
}) {
  const closeModal = () => {
    setDetailOpen(false);
  };
  return (
    <>
      <Modal
        isOpen={isDetailOpen}
        onRequestClose={closeModal}
        style={customDetailStyles}
        contentLabel="detail"
      >
        <Wrapper>
          <Content>{value}</Content>
          <SubContent>
            <SubText1>
              <Explain>작성자</Explain>
              <Detail>{author}</Detail>
            </SubText1>
            <SubText2>
              <Explain>작성날짜</Explain>
              <Detail>24.03.11</Detail>
            </SubText2>
          </SubContent>
        </Wrapper>
        <RemoveBtn>
          <BtnText>삭제하기</BtnText>
        </RemoveBtn>
        <Close>
          <BtnText>닫기</BtnText>
        </Close>
      </Modal>
    </>
  );
}
