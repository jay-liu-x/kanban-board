import styles from '../styles/Column.module.scss';
import { Typography } from 'antd';
import Task from './Task';
import { TaskType } from '../constants/interfaces';

const { Title } = Typography;

const Column = ({ col }) => {
  const title: string = col.title;
  const tasks: TaskType[] = col.taskList;

  return (
    <div className={styles.column_container} title={title}>
      <Title level={3}>
        {col.title}
      </Title>
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            <Task task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Column;
