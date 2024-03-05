import { useParams } from "react-router-dom";
import { useGetAxios } from "../hooks/useAxios";

const apiurl = process.env.REACT_APP_URL;

function MyPage() {
  const { nickname } = useParams();
  const { data, error, isLoading } = useGetAxios({
    url: apiurl + "/chats/1",
    method: "GET",
  });
  return (
    <div>
      <h1>{nickname}</h1>
      <div>{isLoading ? data : error}</div>
    </div>
  );
}

export default MyPage;
