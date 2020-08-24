import React, { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import styles from "./CardDetails.module.css"
import castingCostSort from "../../helpers/castingCostSort"

const CardDetails = () => {
  const { id } = useParams()

  const [card, setCard] = useState({})

  const fetchCard = useCallback(async () => {
    const response = await fetch(`/api/card/${id}`)
    const result = await response.json()
    console.log(result)
    setCard(result)
  }, [id])

  useEffect(() => {
    fetchCard()
  }, [fetchCard])

  return(
    <div>
      <h1>{card.name}</h1>
      <main>
        <section>
          { card.image_uris && <img src={card.image_uris.normal} alt={card.name}/> }
          { card.card_faces && <img src={card.card_faces[0].image_uris.normal} alt={card.name}/> }
          { card.card_faces && <img src={card.card_faces[1].image_uris.normal} alt={card.name}/> }
        </section>
        <section>
          <div className={styles.castingCost}>
            Casting Cost:
            {card.mana_cost && castingCostSort(card.mana_cost)?.map((cost, i) => (
              <img src={cost.src} alt={cost.alt} key={i} />
            ))}
          </div>
        </section>
      </main>
    </div>
)}

export default CardDetails
