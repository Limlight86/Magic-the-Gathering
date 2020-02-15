import React, { useContext } from 'react';
import { Link } from "react-router-dom"
import { AppContext } from "../../context/AppContext"
import styles from "./SearchResultGrid.module.css"

const SearchResultGrid = () => {
  const { apiResponse } = useContext(AppContext)
  
  return (
    <div className={styles.resultsGrid}>
        { apiResponse.length ? apiResponse.map((card) => {
          const { id, name, card_faces, image_uris} = card
          
          return(
            <Link to={`/card/${id}`}>
              <div className={styles.cardContainer} key={id}> 
                  <img 
                  src={ image_uris ? image_uris.small : card_faces[0].image_uris.small } 
                  alt={name}
                />
                {name}
              </div>
            </Link>
          )}) : <h1>Search for Cards Now!</h1>}
    </div>
  )
}

export default SearchResultGrid;
