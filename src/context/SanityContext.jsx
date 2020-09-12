import React, { createContext } from 'react';
import { useQuery } from "@apollo/client"
import {SANITY_DATA} from "../queries/SanityData"

const SanityContext = createContext();

const SanityContextProvider = ({ children }) => {
  const { data } = useQuery(SANITY_DATA)

  const castingCostSort = castingCost => {
    const cleanedCastingCost = castingCost?.replace(/{/gi, "").replace(/}/gi," ")
    const sortedCastingCost = cleanedCastingCost?.split(" ")
    .filter(cost => Boolean(cost)).map(cost => {
        const manaCost = cost
        const symbol = data?.allManaSymbolImage.filter(manaSymbol =>{
          return manaCost === manaSymbol.manaName
        })
        return symbol && {src:symbol[0]?.manaSymbol.asset.url, alt:cost}
      })
    return sortedCastingCost  
    }
  
  return(
    <SanityContext.Provider 
      value={{castingCostSort, data}}
    >
      { children }
    </SanityContext.Provider>
  )
}

export { SanityContext, SanityContextProvider }
