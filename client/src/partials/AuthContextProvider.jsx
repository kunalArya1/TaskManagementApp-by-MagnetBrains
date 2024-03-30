import { useState } from "react";
import AuthContext from "./AuthContext";

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setisAuth] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setisAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
