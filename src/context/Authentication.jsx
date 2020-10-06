import React, { createContext, useState, useEffect } from "react";
import Auth from "../data/Auth";
import client from "../data/Decks";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(Auth.user);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signUp = async (email, password, nickname) => {
    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: { nickname },
      });
      const code = prompt("Input your confirmation code.");
      await Auth.confirmSignUp(email, code);
      await signIn(email, password);
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
    }
  };

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

  const signOut = async () => {
    setLoading(true);
    await Auth.signOut();
    client.cache.reset();
    setUser(null);
    setLoading(false);
  };

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      const signedInUser = await Auth.currentAuthenticatedUser();
      console.log(signedInUser);
      setUser(signedInUser);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("hi");
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        signUp,
        errorMessage,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
