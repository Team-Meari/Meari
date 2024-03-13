import { useNavigate, useParams } from "react-router-dom";
import { useGetAxios, usePostAxios } from "../hooks/useAxios";
import styled from "styled-components";
import Button from "../componentes/Button";
import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";

const Wrapper = styled.div`
  display: flex;
  background-color: beige;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
  overflow: auto;
`;
const Title = styled.h1`
  display: flex;
  justify-content: space-between;
  margin-left: 30px;
  margin-bottom: 100px;
`;
const Nickname = styled.div`
  font-size: 50px;
`;
const Grid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(5, 300px);
  grid-template-rows: repeat(${(props) => parseInt(props.count) || 1}, 150px);
  gap: 30px;
`;
const Item = styled.div`
  border-radius: 10px;
  background-color: ${(props) => props.inputcolor || "black"};
  margin-right: 10px;
`;

const apiurl = process.env.REACT_APP_URL;

function MyPage() {
  const { nickname, memberId } = useParams();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  // 마이페이지 진입 시 내가 쓴 글 조회
  const { data, error, isLoading } = useGetAxios(
    {
      url: apiurl + `chats/myPage`,
      method: "GET",
    },
    "mydata"
  );

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
      navigate(-1);
      console.log("회원탈퇴 되었습니다.");
    } else {
      console.log("회원탈퇴 취소되었습니다.");
    }
  };
  return (
    <Wrapper>
      <Title>
        <Nickname>{nickname}님 반갑습니다</Nickname>
        <Button onClick={onClick} usage={"회원탈퇴"}></Button>
      </Title>

      <Grid count="5">
        <Item inputcolor="green"></Item>
        <Item inputcolor="orange"></Item>
        <Item inputcolor="white"></Item>
        <Item inputcolor="blue"></Item>
        <Item inputcolor="purple"></Item>
        <Item inputcolor="black"></Item>
        <Item inputcolor="gray"></Item>
        <Item inputcolor="red"></Item>
        <Item inputcolor="yellow"></Item>
        <Item inputcolor="green"></Item>
        <Item inputcolor="green"></Item>
        <Item inputcolor="orange"></Item>
        <Item inputcolor="white"></Item>
        <Item inputcolor="blue"></Item>
      </Grid>
    </Wrapper>
  );
}

export default MyPage;
