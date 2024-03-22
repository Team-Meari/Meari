import styled from "styled-components";
import { useState } from "react";

const Wrapper = styled.div`
  /* Frame 22 */

  box-sizing: border-box;
  z-index: ${(props) => (props.$isClicked ? "auto" : "10")};
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  gap: 10px;

  position: absolute;
  width: auto;
  height: ${(props) => (props.$isClicked ? "auto" : "116px")};
  transition: height 1ms ease;

  background: #ffffff;
  border: 1px solid #f4f4f4;
  border-radius: 16px;

  &:hover {
    z-index: 10;
  }
`;

const Content = styled.div`
  /* Frame 23 */

  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  width: auto;
  height: auto;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Text = styled.text`
  /* 모든 국민은 법률이 정하는 바에 의하여 국... */

  width: ${(props) => (props.$isClicked ? "330px" : "220px")};
  height: auto;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 140%;
  /* or 25px */

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: ${(props) =>
    props.$isClicked ? "horizontal" : "vertical"};
  overflow: hidden;
  /* text-overflow: ellipsis; */
  white-space: normal;

  color: #1d1d1d;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Subtext = styled.text`
  /* Frame 33 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  width: auto;
  height: auto;

  /* Inside auto layout */
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
`;

const Date = styled.text`
  /* 24.03.11 */

  width: 80px;
  height: 16px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  /* identical to box height, or 16px */

  color: #666666;

  /* Inside auto layout */
  flex: none;
  order: 0;
  flex-grow: 1;
`;

const Minute = styled.text`
  /* 3분전 */

  width: 80px;
  height: 14px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  /* identical to box height, or 14px */
  text-align: right;

  color: #0cb46c;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 1;
`;

export default function OverlayContent({ content }) {
  const [isClicked, setIsClicked] = useState(false);
  const onClick = (e) => {
    setIsClicked(!isClicked);
  };
  return (
    <Wrapper onClick={onClick} $isClicked={isClicked}>
      <Content>
        <Text $isClicked={isClicked}>{content}</Text>
        <Subtext>
          <Date>23.03.15</Date>
          <Minute>3분전</Minute>
        </Subtext>
      </Content>
    </Wrapper>
  );
}
