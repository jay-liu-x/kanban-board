import { ApolloServer } from 'apollo-server-micro';
import { MongoClient } from 'mongodb';

import typeDefs from '../../utils/graphql/typeDefs';
import resolvers from '../../utils/graphql/resolvers';

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

let db;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    if (!db) {
      try {
        const dbClient = new MongoClient(
          MONGODB_URI,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          }
        );

        if (!dbClient.isConnected()) await dbClient.connect();
        db = dbClient.db(MONGODB_DB); // database name
      } catch (e) {
        console.log('--->error while connecting with graphql context (db)', e);
      }
    }

    return {db}
  },
});

/**
 * API Middlewares
 * To learn more: https://nextjs.org/docs/api-routes/api-middlewares
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = apolloServer.createHandler({ path: '/api/graphql' });

export default handler;
