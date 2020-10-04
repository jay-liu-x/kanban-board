export interface TaskType {
  title: string;
  body: string;
  status: string;
}

export interface ColumnType {
  title: string;
  taskList: TaskType[];
}

export interface BoardType {
  columnList: ColumnType[];
}
