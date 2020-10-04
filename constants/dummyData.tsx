import { TaskType, ColumnType, BoardType } from './interfaces';

export const task1: TaskType = {
  title: 'Task 1',
  body: 'Task 1 is cool',
  label: 'Todo',
};

export const task2: TaskType = {
  title: 'Task 2',
  body: 'Task 2 is cool',
  label: 'Class',
};

export const task3: TaskType = {
  title: 'Task 3',
  body: 'Task 3 is cool',
  label: 'Project',
};

export const column1: ColumnType = {
  title: 'Column 1',
  taskList: [task1, task2],
};

export const column2: ColumnType = {
  title: 'Column 2',
  taskList: [task3],
};

export const board: BoardType = {
  columnList: [column1, column2],
};
