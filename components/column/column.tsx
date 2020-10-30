import PropTypes from 'prop-types';
import Task from '../task/task';
import { Droppable } from 'react-beautiful-dnd';

import { Card } from 'antd';
import { Typography } from 'antd';
import styles from './column.module.scss';

const { Meta } = Card;

const { Title } = Typography;

const Column = ({ column, tasks }) => {
  return (
    <Droppable droppableId={column.id.toString()}>
      {(provided) => (
        <Card className={styles.column_container}>
          <div
            title={column.title}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <Meta title={column.title} />
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </Card>
      )}
    </Droppable>
  );
};

Column.propTypes = {
  column: PropTypes.object,
  tasks: PropTypes.array,
};

export default Column;
