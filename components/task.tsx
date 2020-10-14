import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskDetail from './TaskDetail';

import { Typography } from 'antd';
import styles from '../styles/Task.module.scss';

const { Title, Text } = Typography;

const Task = ({ task, index }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const onClickTask = () => {
    setShowDrawer(!showDrawer);
  };

  const onCloseTaskDetail = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className={styles.task_container}
          onClick={onClickTask}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Title level={5}>{task.title}</Title>
          <Text>{task.body}</Text>
          <TaskDetail
            task={task}
            visible={showDrawer}
            onClose={onCloseTaskDetail}
          />
        </div>
      )}
    </Draggable>
  );
};

export default Task;
