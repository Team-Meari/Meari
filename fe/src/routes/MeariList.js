import ListContent from "../componentes/ListContent";
import { useList } from "../hooks/useList";
import { useEffect, useRef } from "react";
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

function MeariList({ value }) {
  const { mearilist } = useList(value);
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [mearilist]);
  return (
    <ListWrapper ref={containerRef}>
      {mearilist.map((item, index) => (
        <div key={index}>{item.content}</div>
      ))}
    </ListWrapper>
  );
}

export default MeariList;
