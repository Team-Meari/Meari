import styled from "styled-components";
import Modal from "react-modal";
import { useModal } from "../routes/Login";

const customSuccessStyles = {
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
    /* 아이디찾기/success */

    position: "absolute",
    width: "460px",
    height: "357px",
    left: "calc(50% - 460px/2)",
    top: "calc(50% - 357px/2 - 0.5px)",

    background: "#FFFFFF",
    borderRadius: "26px",
  },
};

const IconWrapper = styled.div`
  /* icon */

  position: absolute;
  width: 96px;
  height: 96px;
  left: calc(50% - 96px / 2);
  top: 73px;
`;
const Icon = styled.div`
  /* Ellipse 5 */

  position: absolute;
  width: 70px;
  height: 70px;
  left: calc(50% - 70px / 2);
  top: calc(50% - 70px / 2);

  background: #0cb46c;
`;
const Shadow = styled.div`
  /* Ellipse 4 */

  position: absolute;
  width: 96px;
  height: 96px;
  left: calc(50% - 96px / 2);
  top: calc(50% - 96px / 2);

  background: rgba(12, 180, 108, 0.1);
`;
const Svg = styled.svg`
  /* Vector 1 */

  position: absolute;
  width: 31.5px;
  height: 24.5px;
  left: 34px;
  top: 37px;

  border: 6px solid #ffffff;
`;
const Text = styled.div`
  /* test1234! */

  position: absolute;
  width: 583px;
  height: 30px;
  left: calc(50% - 583px / 2 - 3.5px);
  top: 189px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 100%;
  /* identical to box height, or 30px */
  text-align: center;

  color: #000000;
`;
const SubText = styled.text`
  /* 아이디찾기 성공! */

  position: absolute;
  width: 105px;
  height: 16px;
  left: calc(50% - 105px / 2 - 0.5px);
  top: 229px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */
  text-align: center;

  color: #666666;
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

function Success({ SuccessOpen, setSuccessOpen }) {
  const openModal = () => {
    setSuccessOpen(true);
  };
  const closeModal = () => {
    setSuccessOpen(false);
  };
  return (
    <>
      <Modal
        isOpen={SuccessOpen}
        onRequestClose={closeModal}
        style={customSuccessStyles}
        contentLabel="Success"
      >
        <IconWrapper>
          <Shadow>
            <Icon>
              <Svg
                width="38"
                height="31"
                viewBox="0 0 38 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 17.5L14 27.5L34.5 3"
                  stroke="white"
                  stroke-width="6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </Icon>
          </Shadow>
        </IconWrapper>
        <Text>test1234</Text>
        <SubText>아이디 찾기 성공!</SubText>
      </Modal>
    </>
  );
}
