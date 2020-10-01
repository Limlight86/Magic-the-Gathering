import React, { createContext } from "react";

const AuthorizationContext = createContext();

const AuthorizationContextProvider = ({ children }) => {
  
  return(
    <AuthorizationContext.Provider value={{ user }}>
      {children}
    </AuthorizationContext.Provider>
  ) 
};

export { AuthorizationContext, AuthorizationContextProvider };
