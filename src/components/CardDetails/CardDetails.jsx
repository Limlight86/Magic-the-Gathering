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
    { card.id ? 
    <div>
      <h1>{card.name}</h1>
      <img src={card.image_uris ? card.image_uris.medium : "caca"} alt={card.name}/>
    </div> : <h1>CACA</h1>

}
</div>
)}

export default CardDetails