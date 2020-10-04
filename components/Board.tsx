import { Fragment } from 'react';
import { Card } from 'antd';
import Column from './Column';
import {ColumnType} from '../constants/interfaces'
import styles from '../styles/Board.module.scss';

import { board } from '../constants/dummyData';

const Board = () => {
  return (
    <Card className={styles.board_container}>
      {board.columnList.map((col, i) => (
        <Fragment key={i}>
          <Column col={col} />
        </Fragment>
      ))}
    </Card>
  );
};

export default Board;
