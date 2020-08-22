import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContextProvider } from "./context/AppContext"
import { SearchForm, Navbar, CardDetails } from './components/index';
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
        </Switch>
      </AppContextProvider>
    </BrowserRouter>
  )
}


export default App;
