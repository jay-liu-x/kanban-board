import { gql } from '@apollo/client';

export const GET_COLUMNS_AND_TASKS = gql`
  query {
    columns {
      _id
      name
      taskIds
    }
    tasks {
      _id
      title
      body
    }
  }
`;
