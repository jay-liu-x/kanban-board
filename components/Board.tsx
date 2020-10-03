import styles from '../styles/Board.module.scss'
import { Card, Col, Row } from 'antd';
import Column from './Column';

const Board = () => {
  return (
    <Card className={styles.board_container}>
      <Column />
    </Card>
  );
};

export default Board;
