import { createContext, useState } from "react";

const ModalContext = createContext({});

export function ModalProvider({ children }) {
  const [isErrorOpen, setErrorOpen] = useState(false);
  const [isIdOpen, setIsIdOpen] = useState(false);
  const [isPwOpen, setIsPwOpen] = useState(false);
  const [isSuccess, setSuccessOpen] = useState(false);
  const [isPwSuccess, setPwSuccessOpen] = useState(false);
  const [LoginOpen, setLoginOpen] = useState(false);
  return (
    <ModalContext.Provider
      value={{
        isIdOpen,
        setIsIdOpen,
        isPwOpen,
        setIsPwOpen,
        isSuccess,
        setSuccessOpen,
        LoginOpen,
        setLoginOpen,
        isPwSuccess,
        setPwSuccessOpen,
        isErrorOpen,
        setErrorOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
