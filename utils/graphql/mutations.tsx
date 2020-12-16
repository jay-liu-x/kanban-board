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

export const UPDATE_COLUMNS = gql`
  mutation updateColumns($user: String!, $cols: [updateColumnsInput!]!) {
    updateColumns(user: $user, cols: $cols)
  }
`;
export const UPDATE_COLUMN_NAME = gql`
  mutation updateColumnName($user: String!, $colId: ID!, $colName: String!) {
    updateColumnName(user: $user, colId: $colId, colName: $colName)
  }
`;
export const UPDATE_TASK_TITLE = gql`
  mutation updateTaskTitle($user: String!, $taskId: ID!, $taskTitle: String!) {
    updateTaskTitle(user: $user, taskId: $taskId, taskTitle: $taskTitle)
  }
`;
export const UPDATE_TASK_BODY = gql`
  mutation updateTaskBody($user: String!, $taskId: ID!, $taskBody: String!) {
    updateTaskBody(user: $user, taskId: $taskId, taskBody: $taskBody)
  }
`;
