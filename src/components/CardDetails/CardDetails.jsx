import React, { useState, useEffect, useCallback, useContext } from "react"
import { SanityContext } from "../../context/"
import { useParams } from "react-router-dom"
import { CastingCost, CardImage } from "../"
import styles from "./CardDetails.module.css"

const CardDetails = () => {
  const { id } = useParams()
  const { data } = useContext(SanityContext)

  const [card, setCard] = useState({})

  const fetchCard = useCallback(async () => {
    const response = await fetch(`https://api.scryfall.com/cards/${id}`)
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
      <main className={styles.cardDetailMain}>
        <section className={styles.sectionLeft}>
          <CardImage card={card} />
        </section>
        <section className={styles.sectionRight}>
          <div className={styles.castingCost}>
            <span>Casting Cost: &nbsp;</span>
            <CastingCost card={card} className={!data ? styles.hidden : ""}  />
          </div>
          <h3>{card.type_line}</h3>
        </section>
      </main>
    </div>
)}

export default CardDetails
