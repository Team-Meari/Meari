import { useList } from "../hooks/useList";
import { useEffect, useRef } from "react";
import ListContent from "../componentes/ListContent";
import styled from "styled-components";

const ListWrapper = styled.div`
  height: 700px;
  width: 450px;
  max-height: 700px;
  max-width: 450px;
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
