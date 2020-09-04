import {gql} from "@apollo/client"

export const SANITY_DATA = gql`
  query {
    allManaSymbolImage{
      _id
      manaName
      manaSymbol{
        asset{
          url
        }
      }
    }
  }
`