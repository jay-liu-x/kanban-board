import { Fragment } from 'react';
import Column from './Column';
import styles from '../styles/Board.module.scss';

import { board } from '../constants/dummyData';

const Board = () => {
  return (
    <div className={styles.board_container}>
      {board.columnList.map((col, i) => (
        <Fragment key={i}>
          <Column col={col} />
        </Fragment>
      ))}
    </div>
  );
};

export default Board;
