import { useState } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import TaskModal from '../taskModal/taskModal';

import { Typography, Card } from 'antd';
import styles from './task.module.scss';

const { Title, Text } = Typography;

const Task = ({ task, index }) => {
  const [showModal, setShowModal] = useState(false);

  const onClickTask = () => {
    setShowModal(!showModal);
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          className={styles.task_container}
          onClick={onClickTask}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <Title level={5}>{task.title}</Title>
            <Text>{task.body}</Text>
            <TaskModal task={task} visible={showModal} />
          </Card>
        </div>
      )}
    </Draggable>
  );
};

Task.propTypes = {
  task: PropTypes.object,
  index: PropTypes.number,
};

export default Task;
