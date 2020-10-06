import {
  ApolloClient,
  InMemoryCache,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Auth from "./Auth";

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

const authLink = setContext(async (_, { headers }) => {
  let token;
  try {
    const user = await Auth.currentAuthenticatedUser();
    token = user.signInUserSession.accessToken.jwtToken;
  } catch (error) {
    token = "";
    console.log(error.message);
  }
  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
