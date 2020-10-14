import { Typography } from 'antd';
import { Droppable } from 'react-beautiful-dnd';

import styles from '../styles/Column.module.scss';

import { TaskType } from '../constants/interfaces';
import Task from './Task';

const { Title } = Typography;

const Column = ({ col }) => {
  const title: string = col.title;
  const tasks: TaskType[] = col.taskList;

  return (
    <Droppable droppableId={col.id.toString()}>
      {(provided) => (
        <div
          className={styles.column_container}
          title={title}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Title level={3}>{col.title}</Title>
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
