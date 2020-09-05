import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import { AppContext } from "../../context/"
import styles from "./SearchResultGrid.module.css"

const SearchResultGrid = () => {
  const { filteredCards, addCardToDeck } = useContext(AppContext)

  return (
    <div className={styles.resultsGrid}>
        { filteredCards.length && filteredCards.map((card) => {
          const { id, name, card_faces, image_uris} = card
          return(
            <Link key={id} to={`/card/${id}`} target="_blank">
              <div className={styles.cardContainer} > 
                <div className={styles.imageContainer}>
                  <img 
                  src={ image_uris ? image_uris.small : card_faces[0].image_uris.small } 
                  alt={name}
                  />
                  <button onClick={(e) => addCardToDeck(e, card)}>+</button>
                </div>
                {name}
              </div>
            </Link>
          )})}
    </div>
  )
}

export default SearchResultGrid;
