import PropTypes from 'prop-types';
import { Typography } from 'antd';
import { Droppable } from 'react-beautiful-dnd';

import styles from '../styles/column.module.scss';

import Task from './task';

const { Title } = Typography;

const Column = ({ column, tasks }) => {
  return (
    <Droppable droppableId={column.id.toString()}>
      {(provided) => (
        <div
          className={styles.column_container}
          title={column.title}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Title level={3}>{column.title}</Title>
          {tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

Column.propTypes = {
  column: PropTypes.object,
  tasks: PropTypes.array,
};

export default Column;
