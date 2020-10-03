import styles from '../styles/Column.module.scss';
import { Card, Typography } from 'antd';
import Task from './Task';

const { Title } = Typography;

const Column = () => {
  return (
    <Card className={styles.column_container} title={'Col 1'}>
      <ul>
        <li>
          <Task />
        </li>
      </ul>
    </Card>
  );
};

export default Column;
