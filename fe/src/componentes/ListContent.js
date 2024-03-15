import styled from "styled-components";

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

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const Content = styled.text`
  /* Frame 36 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
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
`;

function ListContent({ value, author }) {
  return (
    <Wrapper>
      <Content>{value}</Content>
      <SubContent>{author}</SubContent>
    </Wrapper>
  );
}

export default ListContent;
