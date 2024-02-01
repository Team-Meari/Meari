import React, { useEffect, useState } from "react";
import ListContent from "../componentes/ListContent";

export const useList = (mvalue) => {
  const [mearilist, setMeariList] = useState([]);
  // 서버에서 리스트를 받아오는 로직이 필요함.
  // 해당 리스트에서 현재 리스트와의 차이만 추가하는 로직이 필요함.
  // 서버에서 받아온 데이터에서 value와 author를 분리해서 ListContent에 넣고 배열로 생성
  useEffect(() => {
    let newItem = {
      content: <ListContent value={mvalue} author={"nickname"} />,
    };
    if (mvalue !== null) {
      setMeariList((prevent) => [...prevent, newItem]);
    }

    console.log(mearilist);
  }, [mvalue]);

  return { mearilist };
};
