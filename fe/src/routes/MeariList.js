import { useList } from "../hooks/useList";
import { useEffect, useRef } from "react";
import ListContent from "../componentes/ListContent";
import styled from "styled-components";

const ListWrapper = styled.div`
  position: absolute;
  width: 400px;
  height: 619px;
  left: 30px;
  top: 152px;
  overflow-y: scroll;

  background: #f8f8f8;
  border-radius: 16px;

  &::-webkit-scrollbar {
    position: absolute;
    width: 6px;
    height: 284px;
    left: 422px;
    top: 172px;

    background: #ebebeb;
    border-radius: 360px;
  }
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
              author={item?.nickName}
            />
          ))
        : null}
    </ListWrapper>
  );
}

export default MeariList;
