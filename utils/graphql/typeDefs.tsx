import { gql } from 'apollo-server-micro';

/**
 * Build schemas for graphql.
 */
const typeDefs = gql`
  type Query {
    columns: [Column]
  }
  type Column {
    column_name: String!
    tasks: [Task]
  }
  type Task {
    id: String!
    column_name: String!
    task_title: String!
    task_body: String
  }
`;

export default typeDefs;
