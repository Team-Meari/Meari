import { createContext, useState } from "react";

const userContext = createContext({});

export function UserProvider({ children }) {
  const [nickname, setNickname] = useState("Loading...");
  const [memberId, setMemberId] = useState();

  return (
    <userContext.Provider
      value={{ nickname, setNickname, memberId, setMemberId }}
    >
      {children}
    </userContext.Provider>
  );
}

export default userContext;
