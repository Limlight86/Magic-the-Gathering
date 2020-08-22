import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState([])

  const queryApi = async (term) => {
    const response = await fetch(`/api/search/${term}`)
    const result = await response.json()
    setApiResponse(result)
    }

  return(
    <AppContext.Provider 
      value={{apiResponse, setApiResponse, queryApi}}>
      { children }
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
