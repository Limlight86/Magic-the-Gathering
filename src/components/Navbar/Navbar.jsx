import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext, AuthContext } from "../../context/";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { deckBuild, discardDeckInProgress } = useContext(AppContext);
  const { user, signOut } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/search">Search</Link>
      {user ? (
        <div>
          <span> {user?.attributes?.nickname} </span>
          <button onClick={signOut}>Log out</button>
        </div>
      ) : (
        "Log in"
      )}
      {deckBuild.length > 0 ? (
        <div className={styles.currentDeckNav}>
          <button onClick={discardDeckInProgress}>Discard Current Deck</button>
          <Link to="/currentDeck">Current Deck</Link>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;
