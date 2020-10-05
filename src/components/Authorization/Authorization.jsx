import React, { useContext, useState } from "react";
import { AuthContext } from "../../context";

const Authorization = ({ children }) => {
  const { user, signIn, signUp, errorMessage, loading } = useContext(
    AuthContext
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [action, setAction] = useState("log in");

  const handleFormSubmitLogIn = (e) => {
    e.preventDefault();
    signIn(email, password);
    setEmail("");
    setPassword("");
  };

  const handleFormSubmitSignUp = (e) => {
    e.preventDefault();
    signUp(email, password, nickname);
    setEmail("");
    setPassword("");
    setNickname("");
  };

  if (loading) return <h1>Loading...</h1>;
  if (user) {
    return children;
  } else {
    return (
      <section>
        <form
          onSubmit={
            action === "log in"
              ? handleFormSubmitLogIn
              : handleFormSubmitSignUp
          }
        >
          <div>
            <label htmlFor="userName">E-mail</label>
            <input
              type="email"
              id="userName"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {action === "sign up" ? (
            <div>
              <label htmlFor="nickname">NickName</label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          ) : null}
          <button type="submit">
            {action === "log in" ? "Log in now" : "Sign up now!"}
          </button>
        </form>
        {action === "log in" ? (
          <button onClick={() => setAction("sign up")}>Sign Up</button>
        ) : (
          <button onClick={() => setAction("log in")}>Log in</button>
        )}

        <p>{errorMessage}</p>
      </section>
    );
  }
};

export default Authorization;
