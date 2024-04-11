import React from "react";
import styled from "styled-components";
import uncheckedImg from "../img/unchecked.png";
import checkedImg from "../img/checked.png";

// 라디오 버튼 컴포넌트 정의
const CustomRadioWrapper = styled.div`
  display: inline-block;
`;

const HiddenRadioInput = styled.input.attrs({ type: "radio" })`
  /* 라디오 버튼을 화면에서 숨김 */
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const CustomRadioLabel = styled.label`
  display: inline-block;
  width: 20px; /* 이미지의 너비에 맞게 조절 */
  height: 20px; /* 이미지의 높이에 맞게 조절 */
  /* 체크된 상태에 대한 이미지 설정 */

  ${(props) =>
    props.$checked
      ? `
    background-image: url(${checkedImg});`
      : `background-image: url(${uncheckedImg}); `}
  background-size: contain; /* 이미지가 요소 내에 맞게 조절됨 */
  cursor: pointer;
`;

// 라디오 버튼 컴포넌트 생성
export const RadioInput = ({ id, name, isChecked, handleRadioClick }) => {
  return (
    <CustomRadioWrapper>
      <HiddenRadioInput id={id} />
      <CustomRadioLabel
        htmlFor={id}
        $checked={isChecked}
        onClick={handleRadioClick}
      />
    </CustomRadioWrapper>
  );
};

export default RadioInput;
