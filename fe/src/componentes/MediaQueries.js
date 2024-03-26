import { useMediaQuery } from "react-responsive";
import { useContext, useEffect } from "react";
import WidthContext from "../contexts/WidthProvider";

export const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
export const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { setIsMobile } = useContext(WidthContext);
  useEffect(() => {
    setIsMobile(isMobile);
  }, []);
  return isMobile ? children : null;
};
export const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  const { isMobile, setIsMobile } = useContext(WidthContext);
  useEffect(() => {
    setIsMobile(isNotMobile);
  }, []);
  return isNotMobile ? children : null;
};
