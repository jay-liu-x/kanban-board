export const dummyData = {
  tasks: {
    0: { id: 0, title: 'Task 0', body: 'Task 0 is cool' },
    1: { id: 1, title: 'Task 1', body: 'Task 1 is cool' },
    2: { id: 2, title: 'Task 2', body: 'Task 2 is cool' },
    3: { id: 3, title: 'Task 3', body: 'Task 3 is cool' },
    4: { id: 4, title: 'Task 4', body: 'Task 4 is cool' },
  },
  columns: {
    0: {
      id: 0,
      title: 'Column 0',
      taskIds: [0, 1, 2],
    },
    1: {
      id: 1,
      title: 'Column 1',
      taskIds: [3],
    },
    2: {
      id: 2,
      title: 'Column 2',
      taskIds: [4],
    },
  },
  board: {columnOrder: [0, 1, 2]},
};
