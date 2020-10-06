const {
  gql,
  ApolloServer,
  UserInputError,
  AuthenticationError,
} = require("apollo-server-lambda");
const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");

const DB = new AWS.DynamoDB.DocumentClient();
const IdentityProvider = new AWS.CognitoIdentityServiceProvider();
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
    decks: async (_, __, { userId }) => {
      const { Items } = await DB.query({
        TableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": userId },
        ScanIndexForward: false,
      }).promise();
      return Items;
    },
    hello: () => "World!",
  },
  Mutation: {
    createDeck: async (_, { deckName, deckContents }, { userId }) => {
      const Item = {
        userId,
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
  context: async ({ event }) => {
    try {
      const AccessToken = event.headers.Authorization;
      const { Username } = await IdentityProvider.getUser({
        AccessToken,
      }).promise();
      return { userId: Username };
    } catch (error) {
      console.log(error.message);
      return { userId: null };
    }
  },
  playground: {
    endpoint: `/${process.env.stage}/graphql`,
  },
  introspection: true,
});

export const handler = server.createHandler({
  cors: { origin: true, credentials: true },
});
