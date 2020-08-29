import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContextProvider } from "./context/AppContext"
import { SearchForm, Navbar, CardDetails, CurrentDeck } from './components/index';
import './App.css';

const App = () => {
  return(
    <BrowserRouter>
      <AppContextProvider>
        <Navbar />
        <Switch>
          <Route exact path="/" component={SearchForm} />
          <Route path="/search" component={SearchForm} />
          <Route path="/card/:id" component={CardDetails} />
          <Route path="/currentDeck" component={CurrentDeck} />
        </Switch>
      </AppContextProvider>
    </BrowserRouter>
  )
}


export default App;
