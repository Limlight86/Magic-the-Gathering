import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AppContext } from "../../context/AppContext"
import styles from "./Navbar.module.css"

const Navbar = ()=>{
  const { deckBuild, discardDeckInProgress} = useContext(AppContext)

  return(
    <nav>
      <Link to="/search">Search</Link>
      {
        deckBuild.length > 0 ? 
        <div className={styles.currentDeckNav}>
          <button onClick={discardDeckInProgress}>Discard Current Deck</button>
          <Link to="/currentDeck">Current Deck</Link>
        </div>
        :
        null 
      }
    </nav>
  )
}

export default Navbar
