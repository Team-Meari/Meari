import { useList } from "../hooks/useList";
import { useEffect, useRef } from "react";
import ListContent from "../componentes/ListContent";
import styled from "styled-components";

const ListWrapper = styled.div`
  height: 500px;
  width: 400px;
  max-height: 500px;
  max-width: 400px;
  overflow-y: scroll;
  overflow-x: visible;
  background-color: beige;
`;

function MeariList({ data }) {
  const { mearilist } = useList(data);
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [mearilist]);

  return (
    <ListWrapper ref={containerRef}>
      {mearilist
        ? mearilist.map((item, index) => (
            <ListContent
              key={index}
              value={item?.content}
              author={item?.chatId}
            />
          ))
        : null}
    </ListWrapper>
  );
}

export default MeariList;
