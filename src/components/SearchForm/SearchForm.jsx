import React, { useState, useContext } from 'react';
import {AppContext} from "../../context/AppContext"

const SearchForm = () => {
  const [term, setTerm] = useState('');
  const { queryApi } = useContext(AppContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    queryApi(term)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} />
      </form>
    </div>
  )
}

export default SearchForm;
