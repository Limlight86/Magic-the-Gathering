import React, { useState, useContext, useEffect, useCallback } from "react"
import { AppContext } from "../../context/"

const SearchFilter = () => {
  const [filter, setFilter] = useState("all")
  const [filterValue, setFilterValue] = useState("all")
  const { apiResponse, setFilteredCards } = useContext(AppContext)

  const cardTypes = [...new Set(apiResponse.map(card => card.type_line))]
  const cmcs = [...new Set(apiResponse.map(card => card.cmc))]

  const filterCards = useCallback(() => {
    if(filterValue === "all"){
      setFilteredCards([...apiResponse])
      return
    }
    if(filter === "all") return
      const filteredCards = apiResponse.filter((card) => {
        if(card[filter]?.length === 0 && filterValue === " ") return (card[filter])
        if(filter === "cmc") return card[filter] === Number(filterValue)
        return card[filter].includes(filterValue)
    })
      setFilteredCards([...filteredCards])  
  }, [filterValue, apiResponse, filter, setFilteredCards])

  useEffect(()=>{
    if(filter === "all"){
      setFilteredCards([...apiResponse])
      setFilterValue("all")
      return
    }
    setFilteredCards([...apiResponse])
    setFilterValue("all")
  }, [filter, apiResponse, setFilteredCards])
  
  useEffect(()=>{
    filterCards()
  },[filterValue, filterCards])

  return(
  <div>
    <select name="search-filter" id="search-filter" onChange={(e)=>setFilter(e.target.value)}>
      <option value="all">All</option>
      <option value="type_line">Card Type</option>
      <option value="colors">Color</option>
      <option value="cmc">Converted Casting Cost</option>
    </select>
    {
      filter === "type_line" ? (
      <select name="search-filter" id="search-filter" onChange={(e)=>setFilterValue(e.target.value)}>
        <option value="all">All</option>
        {
          cardTypes.map(type => <option key={type} value={type}>{type}</option>)
        }
      </select>
      ) : null
    }
    {
      filter === "colors" ? (
        <select name="search-filter" id="search-filter" onChange={(e)=>setFilterValue(e.target.value)}>
          <option value="all">All</option>
          <option value="W">White</option>
          <option value="U">Blue</option>
          <option value="B">Black</option>
          <option value="R">Red</option>
          <option value="G">Green</option>
          <option value=" ">Colorless</option>
        </select>
      ) : null
    }
    {
      filter === "cmc" ? (
        <select name="search-filter" id="search-filter" onChange={(e)=>setFilterValue(e.target.value)}>
          <option value="all">All</option>
          {
            cmcs.map(cmc => <option key={cmc} value={cmc}>{cmc}</option>)
          }
        </select>
      ) : null
    }

  </div>
  )
}

export default SearchFilter