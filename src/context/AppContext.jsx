import React, { createContext, useState } from 'react';
import axios from 'axios';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState([])

  const queryApi = (term) => {
    axios.get(`https://api.scryfall.com/cards/search?order=name&q=${term}`)
    .then(({ data }) => {
       setApiResponse(data.data)
    })
  }

  return(
    <AppContext.Provider 
      value={{apiResponse, queryApi}}>
      { children }
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
