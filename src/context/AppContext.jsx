import React, { createContext, useState } from 'react';
import axios from 'axios';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState([])

  const queryApi = (term) => {
    axios.get(`https://api.scryfall.com/cards/search?order=name&q=${term}`)
    .then(({ data }) => {
       setApiResponse(data.data)
       console.log(data.data)
    })
  }

  return(
    <AppContext.Provider 
      value={{apiResponse, setApiResponse, queryApi}}>
      { children }
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
