import { gql } from '@apollo/client';

export const ADD_COLUMN = gql`
  mutation addColumn($user: String!, $colName: String!) {
    addColumn(user: $user, colName: $colName)
  }
`;
