import React, { useContext } from "react";
import { AppContext } from "../../context";

const UserDecks = () => {
  const { decks } = useContext(AppContext);
  console.log(decks)

  return (
    <div>
      <ul>
        {decks?.decks?.map((deck) => {
          return <li key={deck.id}>{deck.deckName}</li>;
        })}
      </ul>
    </div>
  );
};

export default UserDecks;
