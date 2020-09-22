const {
  gql,
  ApolloServer,
  UserInputError,
  AuthenticationError,
} = require("apollo-server-lambda");
const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");

const DB = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.tableName;

const typeDefs = gql`
  type Deck {
    id: String!
    userId: String!
    deckName: String!
    deckContents: String!
  }
  type Query {
    decks: [Deck]!
    hello: String!
  }
  type Mutation {
    createDeck(deckName: String!, deckContents: String!): Deck!
    updateDeck(deckName: String!, deckContents: String!): Deck!
    deleteDeck(id: String!): Deck!
  }
`;

const resolvers = {
  Query: {
    decks: async () => {
      const { Items } = await DB.query({
        TableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": "testUser" },
        ScanIndexForward: false,
      }).promise();
      return Items;
    },
    hello: () => "World!",
  },
  Mutation: {
    createDeck: async (_, { deckName, deckContents }) => {
      const Item = {
        userId: "testUser",
        id: Date.now() + uuid(),
        deckName,
        deckContents,
      };
      await DB.put({ TableName, Item }).promise();
      return Item;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: `/${process.env.stage}/graphql`,
  },
  introspection: true,
});

export const handler = server.createHandler({
  cors: { origin: true, credentials: true },
});
