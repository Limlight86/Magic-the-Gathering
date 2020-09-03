import React, { createContext, useState, useEffect } from 'react';
import { useQuery } from "@apollo/client"
import {SANITY_DATA} from "../queries/SanityData"

const SanityContext = createContext();

const SanityContextProvider = ({ children }) => {
  const [sanityData, setSanityData] = useState({})
  const {loading, error, data} = useQuery(SANITY_DATA)

  console.log(data)

  const castingCostSort = castingCost => {
    const { allManaSymbolImage } = sanityData.data && sanityData.data
    const cleanedCastingCost = castingCost.replace(/{/gi, "").replace(/}/gi," ")
    const sortedCastingCost = cleanedCastingCost.split(" ")
    .filter(cost => Boolean(cost)).map(cost => {
        const manaCost = cost
        const symbol = allManaSymbolImage.filter(manaSymbol =>{
          return manaCost === manaSymbol.manaName
        })
        if(symbol.length) return {src:symbol[0].manaSymbol.asset.url, alt:cost}
        return{src:"N", alt:"N"}
      })
    return sortedCastingCost  
    }
  
  return(
    <SanityContext.Provider 
      value={{castingCostSort}}
    >
      { children }
    </SanityContext.Provider>
  )
}

export { SanityContext, SanityContextProvider }
