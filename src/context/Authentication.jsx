import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({email:"testUser@email.com"})

  return(
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  ) 
};

export { AuthContext, AuthContextProvider };
