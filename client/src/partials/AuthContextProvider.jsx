import { useState } from "react";
import AuthContext from "./AuthContext";

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
  const [name, setName] = useState("");
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setisAuth,
        name,
        setName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
