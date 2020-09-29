import React from "react";
import { useQuery } from "@apollo/client";
import client, { USER_DECKS_QUERY } from "../../data/Decks";

const UserDecks = () => {
  const { data } = useQuery(USER_DECKS_QUERY, { client })
  console.log(data)

  return <h1>Decks Page</h1>;
};

export default UserDecks;
