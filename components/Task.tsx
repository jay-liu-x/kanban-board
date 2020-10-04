import { useState } from 'react';
import { Typography } from 'antd';
import TaskDetail from './TaskDetail';
import styles from '../styles/Task.module.scss';

const { Title, Text } = Typography;

const Task = ({ task }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const onClickTask = () => {
    setShowDrawer(!showDrawer);
  }

  const onCloseTaskDetail = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <div className={styles.task_container} onClick={onClickTask}>
      <Title level={5}>{task.title}</Title>
      <Text>{task.body}</Text>
      <TaskDetail task={task} visible={showDrawer} onClose={onCloseTaskDetail} />
    </div>
  );
};

export default Task;
