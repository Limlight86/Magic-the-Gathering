import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [apiResponse, setApiResponse] = useState([])

  const queryApi = async (term) => {
    console.log(term)
    const response = await fetch(`http://localhost:8080/api/search/${term}`)
    const result = await response.json()
    await setApiResponse(result)
    }

  return(
    <AppContext.Provider 
      value={{apiResponse, setApiResponse, queryApi}}>
      { children }
    </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
