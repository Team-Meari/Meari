import { useState } from "react";
import styled from "styled-components";
import MeariDetail from "../modals/MeariDetail";

const Wrapper = styled.div`
  /* Frame 4 */

  box-sizing: border-box;

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  gap: 8px;

  width: 350px;
  height: auto;
  margin-left: 20px;
  border-bottom: 1px solid #e3e3e3;

  &::-webkit-box {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    white-space: normal;
  }

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  ${(props) =>
    props.$custom &&
    `
    /* Frame 55 */

    /* Auto layout */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;
    margin-bottom: -10px;

    width: 1012px;
    height: 68px;


    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;

  `}
`;
const Content = styled.text`
  /* Frame 36 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 0px;
  gap: 10px;
  margin-left: -11px;

  width: auto;
  height: auto;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 120%;
  /* identical to box height, or 22px */

  color: #1d1d1d;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;

  //white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;

  ${(props) =>
    props.$custom &&
    `
    margin-top: 10px;
    margin-left: 5px;
  `}
`;
const SubContent = styled.text`
  /* 24.03.11 */

  width: 59px;
  height: 16px;
  margin-left: -11px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  color: #666666;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;

  ${(props) =>
    props.$custom &&
    `
    margin-left: 5px;
  `}
`;

function ListContent({ value, author, chatId, $custom }) {
  const [isDetailOpen, setDetailOpen] = useState(false);
  const onClick = () => {
    setDetailOpen(true);
  };
  return (
    <>
      <Wrapper $custom={$custom} onClick={onClick}>
        <Content $custom={$custom}>{value}</Content>
        <SubContent $custom={$custom}>{author}</SubContent>
      </Wrapper>
      {isDetailOpen ? (
        <MeariDetail
          isDetailOpen={isDetailOpen}
          setDetailOpen={setDetailOpen}
          value={value}
          author={author}
          chatId={chatId}
        />
      ) : null}
    </>
  );
}

export default ListContent;
