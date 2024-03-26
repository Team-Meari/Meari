import styled from "styled-components";
import Button from "../componentes/Button";

const Wrapper = styled.div`
  /* Frame 75 */
  z-index: 1;
  position: absolute;
  width: calc(100%);
  height: 50px;
  left: 0px;
  top: 0px;

  background: rgba(255, 255, 255, 0.5);
`;

export default function MobileHeader({ children }) {
  return (
    <>
      <Wrapper>{children}</Wrapper>
    </>
  );
}
