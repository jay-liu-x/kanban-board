import { gql } from 'apollo-server-micro';

/**
 * Build schemas for graphql.
 */
const typeDefs = gql`
  type Query {
    columns: [Column]!
    tasks: [Task]!
  }
  type Column {
    _id: String!
    name: String!
    taskIds: [String]
  }
  type Task {
    _id: String!
    title: String!
    body: String
  }
`;

export default typeDefs;
