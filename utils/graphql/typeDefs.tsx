import { gql } from 'apollo-server-micro';

/**
 * Build schemas for graphql.
 */
const typeDefs = gql`
  type Query {
    columns: [Column]!
    tasks: [Task]!
  }

  type Mutation {
    addColumn(user: String, colName: String): Boolean
  }

  type Column {
    _id: ID!
    name: String!
    taskIds: [String]
  }

  type Task {
    _id: ID!
    title: String!
    body: String
  }
`;

export default typeDefs;
