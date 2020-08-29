import React, { createContext, useState, useEffect } from 'react';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState([])
  const [deckBuild, setDeckBuild] = useState([])

  const queryApi = async (term) => {
    const response = await fetch(`/api/search/${term}`)
    const result = await response.json()
    setApiResponse(result)
    }

  const addCardToDeck = (e, card) => {
    e.preventDefault()
    const currentDeck = deckBuild
    const cardInDeck = currentDeck.find(theCard => theCard.id === card.id)
    if (cardInDeck){
      const id = currentDeck.findIndex(theCard => theCard.id === card.id)
      currentDeck[id].count += 1
      setDeckBuild([...currentDeck])
    } else {
      setDeckBuild([...currentDeck, {...card, count: 1}])
    }
  }

  useEffect(()=> {
    if(deckBuild.length > 0){
      localStorage.setItem("deckInProgress", JSON.stringify(deckBuild));
    }
  }, [deckBuild])

  useEffect(() => {
    const getDeckInProgress = async () => {
      const deckInProgress = localStorage.getItem("deckInProgress")
      console.log(deckInProgress)
      const result =  await JSON.parse(deckInProgress)
      if(typeof result === "object" && result !== null ){
        console.log(result)
        setDeckBuild([...result])
      } 
    }
    getDeckInProgress()
  }, [])

  return(
    <AppContext.Provider 
      value={{apiResponse, setApiResponse, queryApi, deckBuild, setDeckBuild, addCardToDeck}}
    >
      { children }
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
