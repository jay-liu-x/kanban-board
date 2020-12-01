export const queryGetColumns = `
  query {
    columns {
      id
      column_name
      tasks {
        id
        task_title
        task_body
      }
    }
  }
`;
