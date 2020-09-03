import {gql} from "@apollo/client"

export const SANITY_DATA = gql`
  query {
    allManaSymbolImage{
      manaName
      manaSymbol{
        asset{
          url
        }
      }
    }
  }
`