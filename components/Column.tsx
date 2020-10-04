import styles from '../styles/Column.module.scss';
import { Card, Typography } from 'antd';
import Task from './Task';
import task from '../pages/api/task';

const { Title } = Typography;

const Column = ({ col }) => {
  const title: string = col.title;
  const tasks: TaskType[] = col.taskList;

  return (
    <Card className={styles.column_container} title={title}>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            <Task task={task}/>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default Column;
