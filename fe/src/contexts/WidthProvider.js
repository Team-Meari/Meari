import { createContext, useState } from "react";

const WidthContext = createContext({});

export function WidthProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <WidthContext.Provider value={{ isMobile, setIsMobile }}>
      {children}
    </WidthContext.Provider>
  );
}

export default WidthContext;
