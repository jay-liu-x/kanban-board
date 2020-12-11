import PropTypes from 'prop-types';
import Task from '../task/task';
import { Droppable } from 'react-beautiful-dnd';

import { Card } from 'antd';
import { Typography } from 'antd';
import styles from './column.module.scss';

const { Title } = Typography;

const Column = ({ column, tasks }) => {
  return (
    <Droppable droppableId={column._id}>
      {(provided) => (
        <div
          className={styles.column_container}
          title={column.name}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Card style={{ backgroundColor: '#3e526d', height: '100%' }}>
            <Title level={5} style={{ color: 'white' }}>
              {column.name}
            </Title>
            {column.taskIds.map((taskId, index) => {
              // only get the tasks belonging to current column
              const task: object = tasks.find((task) => task._id === taskId);
              return <Task key={taskId} task={task} index={index} />;
            })}
            {provided.placeholder}
          </Card>
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
