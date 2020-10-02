import React, { createContext, useState, useEffect } from "react";
import Auth from "../data/Auth";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(Auth.user);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const signedInUser = await Auth.signIn(email, password);
      setUser(signedInUser);
      setLoading(false);
      console.log(signedInUser);
    } catch (error) {
      setUser(null);
      console.log(error.message);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const signedInUser = await Auth.currentAuthenticatedUser();
      setUser(signedInUser);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("hi")
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, signIn, errorMessage, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
