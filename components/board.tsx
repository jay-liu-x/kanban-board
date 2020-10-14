import { DragDropContext } from 'react-beautiful-dnd';
import Column from './column';

import styles from '../styles/board.module.scss';

import { dummyData } from '../constants/dummyData';

const Board = () => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // do nothing if not changing position of task
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const column = dummyData.columns[source.droppableId];
    const newTaskIds: number[] = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1); // remove element with source index
    newTaskIds.splice(destination.index, 0, draggableId); // insert at new pos

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board_container}>
        {dummyData.columnOrder.map((columnId) => {
          const column = dummyData.columns[columnId];
          const curTasks = dummyData.tasks;
          const tasks = column.taskIds.map((taskId) => curTasks[taskId]);
          return <Column key={columnId} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
};

export default Board;
