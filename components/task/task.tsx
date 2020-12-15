import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import { Typography, Card } from 'antd';
import styles from './task.module.scss';

const { Title, Text } = Typography;

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          className={styles.task_container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card>
            <Title level={5}>{task.title}</Title>
            <Text>{task.body}</Text>
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
