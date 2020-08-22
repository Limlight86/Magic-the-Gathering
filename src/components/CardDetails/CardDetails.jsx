import React, { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"

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
      { card.image_uris && <img src={card.image_uris.normal} alt={card.name}/> }
      { card.card_faces && <img src={card.card_faces[0].image_uris.normal} alt={card.name}/> }
      { card.card_faces && <img src={card.card_faces[1].image_uris.normal} alt={card.name}/> }
    </div>
)}

export default CardDetails
