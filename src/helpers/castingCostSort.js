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
    let imageRoute = cost
    switch (cost) {
      case '1':
        imageRoute = "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/9/96/1.svg/revision/latest?cb=20160121091619" ;
        break;
      case '2':
        imageRoute = "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/4/4d/2.svg/revision/latest?cb=20160121091624" ;
        break;
      case '3':
        imageRoute = "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/8/8c/3.svg/revision/latest?cb=20160121091629" ;
        break;
      case '4':
        imageRoute = "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/b/bf/4.svg/revision/latest?cb=20160121091649" ;
        break;
      case '5':
        imageRoute = "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/9/94/5.svg/revision/latest?cb=20160121091654" ;
        break;
      case '6':
        imageRoute = "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/4/44/6.svg/revision/latest?cb=20160121091657" ;
        break;
      case '7':
        imageRoute = "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/a/a5/7.svg/revision/latest?cb=20160121091702" ;
        break;
      case 'B':
        imageRoute = allManaSymbolImage[1].manaSymbol.asset.url;
        break;
      case 'W':
        imageRoute = allManaSymbolImage[2].manaSymbol.asset.url;
        break;
      case 'R':
        imageRoute = allManaSymbolImage[3].manaSymbol.asset.url;
        break;
      case 'G':
        imageRoute = allManaSymbolImage[0].manaSymbol.asset.url;
        break;
      case 'U':
        imageRoute = allManaSymbolImage[4].manaSymbol.asset.url;
        break;
      default:
        imageRoute = null;
    }
    return {src:imageRoute, alt:cost}
  })
  return sortedCastingCost
}

export default castingCostSort
