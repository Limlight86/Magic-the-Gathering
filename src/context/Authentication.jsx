import React, { createContext, useState } from "react";
import Auth from "../data/Auth";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    try {
      const signedInUser = await Auth.signIn(email, password);
      setUser(signedInUser);
      console.log(signedInUser);
    } catch (error) {
      setUser(null);
      console.log(error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
