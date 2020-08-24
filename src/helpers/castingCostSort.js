const castingCostSort = castingCost => {

  const cleanedCastingCost = castingCost.replace(/{/gi, "").replace(/}/gi,"")
  
  const sortedCastingCost = cleanedCastingCost.split("").map(cost => {
    let imageRoute = cost
    switch (cost) {
      case '1':
        imageRoute = "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/archive/9/96/20160120202041%211.svg" ;
        break;
      case 'B':
        imageRoute = "https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/archive/2/2f/20160121092155%21B.svg";
        break;
        default:
        imageRoute = null;
    }
    return {src:imageRoute, alt:cost}
  })
  return sortedCastingCost
}

export default castingCostSort
