import PropTypes from 'prop-types';
import Task from '../task/task';
import { Droppable } from 'react-beautiful-dnd';

import { Card } from 'antd';
import { Typography } from 'antd';
import styles from './column.module.scss';

const { Title } = Typography;

const Column = ({ column }) => {

  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          className={styles.column_container}
          title={column.column_name}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Card style={{ backgroundColor: '#3e526d', height: '100%' }}>
            <Title level={5} style={{ color: 'white' }}>
              {column.column_name}
            </Title>
            {column.tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </Card>
        </div>
      )}
    </Droppable>
  );
};

Column.propTypes = {
  column: PropTypes.object,
};

export default Column;
