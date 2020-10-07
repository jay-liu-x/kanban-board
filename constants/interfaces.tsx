export interface TaskType {
  id: number;
  title: string;
  body: string;
  label: string;
}

export interface ColumnType {
  id: number,
  title: string;
  taskList: TaskType[];
}

export interface BoardType {
  columnList: ColumnType[];
}
