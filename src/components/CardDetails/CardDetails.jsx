import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"

const CardDetails = (props) => {
  const { id } = props.match.params

  console.log(props)
  const [card, setCard] = useState({})

  const fetchCard = useCallback(async () => {
    let { data } = await axios.get(`https://api.scryfall.com/cards/${id}`)
    console.log(data)
    setCard(data)
  }, [id])

  useEffect(() => {
    console.log("render")
    fetchCard()
  }, [fetchCard])


  return(
    <div>
      <h1>{card.name}</h1>
      {card.image_uris && <img src={card.image_uris.normal} alt={card.name}/>}
    </div>
)}

export default CardDetails