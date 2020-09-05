import React, { useContext } from "react"
import { SanityContext } from "../../context/"
import styles from "./CastingCost.module.css"

const CastingCost = ({ card }) => {
  const {castingCostSort} = useContext(SanityContext)
  
  let image

  if (card.card_faces && card.layout !== "split" &&  card.layout !== "adventure"){
    image = castingCostSort(card.card_faces[0].mana_cost)?.map((cost, i) => (
      <img src={cost.src} alt={cost.alt} key={i} />))
  } else {
    image = card.mana_cost && castingCostSort(card.mana_cost)?.map((cost, i) => (
      cost?.src ? 
        <img src={cost.src} alt={cost.alt} key={i} /> 
        : 
        <span id={styles.split} key={i}>{"/".repeat(2)}</span>))
  }

  return(
    <>
      {image}
    </>
  )   
}

export default CastingCost