import React from 'react';
import { AppContextProvider } from "./context/AppContext"
import { SearchForm, SearchResultGrid } from './components/index';
import './App.css';

const App = () => {
  return(
    <div>
      <h1>Magic the Gathering Stuff</h1>
      <AppContextProvider>
        <SearchForm/>
        <SearchResultGrid/>
      </AppContextProvider>
    </div>
  )
}


export default App;
