import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";

export const USER_DECKS_URL = "http://localhost:4000/dev/graphql";

export const USER_DECKS_QUERY = gql`
  query Decks {
    decks {
      id
      deckName
    }
  }
`;

const httpLink = createHttpLink({ uri: USER_DECKS_URL });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;