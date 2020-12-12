import { gql } from '@apollo/client';

export const ADD_COLUMN = gql`
  mutation addColumn($user: String!, $colName: String!) {
    addColumn(user: $user, colName: $colName)
  }
`;

export const DELETE_COLUMN = gql`
  mutation addColumn($user: String!, $colId: ID!) {
    deleteColumn(user: $user, colId: $colId)
  }
`;
