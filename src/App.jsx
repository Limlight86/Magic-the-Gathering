import React from 'react';
import { ApolloProvider } from "@apollo/client"
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContextProvider, SanityContextProvider } from "./context/"
import { SearchForm, Navbar, CardDetails, CurrentDeck } from './components/index';
import client from "./data/ApolloClient"
import './App.css';

const App = () => {
  return(
    <BrowserRouter>
      <ApolloProvider client={client}>
        <SanityContextProvider>
        <AppContextProvider>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchForm} />
            <Route path="/search" component={SearchForm} />
            <Route path="/card/:id" component={CardDetails} />
            <Route path="/currentDeck" component={CurrentDeck} />
          </Switch>
        </AppContextProvider>
        </SanityContextProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}


export default App;
