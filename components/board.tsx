import { Fragment } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

import styles from '../styles/Board.module.scss';

import { board } from '../constants/dummyData';

const Board = () => {
  const onDragEnd = (result) => {
    // TODO:
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board_container}>
        {board.columnList.map((col) => (
          <Fragment key={col.id}>
            <Column col={col} />
          </Fragment>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
