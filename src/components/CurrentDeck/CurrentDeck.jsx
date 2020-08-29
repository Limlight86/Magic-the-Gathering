import React, { useContext } from 'react';
import { AppContext } from "../../context/AppContext"

const CurrentDeck = () => {
  const { deckBuild } = useContext(AppContext)

  return (
    <div>
      <ul>
        {
          deckBuild.map(card => (
            <li key={card.id}>
              {card.count}
              {card.name}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default CurrentDeck;
