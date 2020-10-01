import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";

export const USER_DECKS_URL = process.env.REACT_APP_GATEWAY_URL;

export const USER_DECKS_QUERY = gql`
  query Decks {
    decks {
      id
      deckName
    }
  }
`;

export const SAVE_DECK_MUTATION = gql`
  mutation createDeck($deckName: String!, $deckContents: String!) {
    createDeck(deckName: $deckName, deckContents: $deckContents) {
      id
      userId
      deckName
      deckContents
    }
  }
`;

const httpLink = createHttpLink({ uri: USER_DECKS_URL });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
