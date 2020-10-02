import React, { useContext, useState } from "react";
import { AuthContext } from "../../context";

const Authorization = ({ children }) => {
  const { user, signIn, errorMessage, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
  };

  if (loading) return <h1>Loading...</h1>;
  if (user) {
    return children;
  } else {
    return (
      <section>
        <form onSubmit={handleFormSubmit}>
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
          <button type="submit">Log in</button>
        </form>
        <p>{errorMessage}</p>
      </section>
    );
  }
};

export default Authorization;
