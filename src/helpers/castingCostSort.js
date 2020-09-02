let data = {}

const fetchImages = async () => {
  const response = await fetch(`/api/sanityData`)
  const result = await response.json()
  console.log(result)
  data = result
} 

fetchImages()

const castingCostSort = castingCost => {
  const { allManaSymbolImage } = data.data
  const cleanedCastingCost = castingCost.replace(/{/gi, "").replace(/}/gi,"")
  
  const sortedCastingCost = cleanedCastingCost.split("").map(cost => {
      const manaCost = cost
      const symbol = allManaSymbolImage.filter(manaSymbol =>{
        return manaCost === manaSymbol.manaName
      })
      return {src:symbol[0].manaSymbol.asset.url, alt:cost}
    })
  return sortedCastingCost  
  }

export default castingCostSort
