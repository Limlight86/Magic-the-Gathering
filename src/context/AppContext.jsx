import React, { createContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import client, { USER_DECKS_QUERY, SAVE_DECK_MUTATION } from "../data/Decks";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState([]);
  const [deckBuild, setDeckBuild] = useState([]);
  const [currentDeckName, setCurrentDeckName] = useState("");
  const [filteredCards, setFilteredCards] = useState([]);

  const { data: decks } = useQuery(USER_DECKS_QUERY, { client });
  const [createDeck] = useMutation(SAVE_DECK_MUTATION, {
    client,
    update(cache, mutationResult) {
      const { decks = [] } = cache.readQuery({ query: USER_DECKS_QUERY });
      console.log(decks)
      const newDeck = mutationResult.data.createDeck;
      cache.writeQuery({
        query: USER_DECKS_QUERY,
        data: {
          decks: [newDeck, ...decks],
        },
      });
    },
  });

  const history = useHistory();

  const queryApi = async (term) => {
    const response = await fetch(
      `https://api.scryfall.com/cards/search?order=name&q=${term}`
    );
    const { data } = await response.json();
    setApiResponse(data);
    setFilteredCards(data);
  };

  const addCardToDeck = (e, card) => {
    e.preventDefault();
    const currentDeck = deckBuild;
    const cardInDeck = currentDeck.find((theCard) => theCard.id === card.id);
    if (cardInDeck) {
      const id = currentDeck.findIndex((theCard) => theCard.id === card.id);
      currentDeck[id].count += 1;
      setDeckBuild([...currentDeck]);
    } else {
      setDeckBuild([...currentDeck, { ...card, count: 1 }]);
    }
  };

  const discardDeckInProgress = () => {
    window.confirm("Discard current deck?");
    setDeckBuild([]);
    localStorage.removeItem("deckInProgress");
    history.push("/");
  };

  const handleCreateDeck = async () => {
    window.confirm("Save current deck?");
    const deckContents = JSON.stringify(deckBuild);
    await createDeck({
      variables: {
        deckName: currentDeckName,
        deckContents,
      },
      optimisticResponse: {
        __typename: "Mutation",
        createDeck: {
          __typename: "Deck",
          id: 0,
          currentDeckName,
        },
      },
    });
    localStorage.removeItem("deckInProgress");
    localStorage.removeItem("currentDeckName");
    setDeckBuild([])
    setCurrentDeckName("")
    history.push("/userdecks");
  };

  useEffect(() => {
    if (deckBuild.length > 0) {
      localStorage.setItem("deckInProgress", JSON.stringify(deckBuild));
    }
  }, [deckBuild]);

  useEffect(() => {
    const getDeckInProgress = async () => {
      const deckInProgress = localStorage.getItem("deckInProgress");
      const result = await JSON.parse(deckInProgress);
      if (typeof result === "object" && result !== null) {
        setDeckBuild([...result]);
        setCurrentDeckName(localStorage.getItem("currentDeckName"));
      }
    };
    getDeckInProgress();
  }, []);

  return (
    <AppContext.Provider
      value={{
        apiResponse,
        setApiResponse,
        queryApi,
        deckBuild,
        setDeckBuild,
        addCardToDeck,
        discardDeckInProgress,
        setFilteredCards,
        filteredCards,
        currentDeckName,
        setCurrentDeckName,
        handleCreateDeck,
        decks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
