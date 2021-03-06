import React, { useState, useContext } from 'react';
import { AppContext } from "../../context/"
import { SearchResultGrid, SearchFilter } from "../index"

const SearchForm = () => {
  const [term, setTerm] = useState('');
  const { apiResponse, queryApi, filteredCards } = useContext(AppContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    queryApi(term)
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} />
      </form>
      {
        apiResponse.length ?(
          <div>
            <SearchFilter />
            { filteredCards.length > 0 && <SearchResultGrid /> }
          </div>
        )  : <h1>Search for Cards now!</h1>
      }
    </div>
  )
}

export default SearchForm;
