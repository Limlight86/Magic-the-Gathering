import { gql } from "@apollo/client";

export const DECKS_API_URL = "http://localhost:4000/dev/graphql"

export const USER_DECKS_QUERY = gql`
  query Decks {
    decks {
      id
      deckName
    }
  }
`;
