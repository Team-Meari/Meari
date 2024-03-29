import styled from "styled-components";
import Spinner from "../img/loading.gif";

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoadingText = styled.div`
  font: 1rem "Noto Sans KR";
  text-align: center;
`;

const Image = styled.img``;

export default function Loading() {
  return (
    <Background>
      <LoadingText>잠시만 기다려주세요!!!</LoadingText>
      <Image src={Spinner}></Image>
    </Background>
  );
}
