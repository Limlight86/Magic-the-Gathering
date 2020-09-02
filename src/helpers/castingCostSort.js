let data = {}

export const fetchImages = async () => {
  const response = await fetch(`/api/sanityData`)
  const result = await response.json()
  console.log(result)
  data = await result
}

export const castingCostSort = castingCost => {
  const { allManaSymbolImage } = data.data && data.data
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
