import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';

import { Input } from 'antd';
import styles from './task.module.scss';

const Task = ({ task, index }) => {
  const onTaskTitleChange = (e) => {console.log(e)};

  const onTaskBodyChange = (e) => {console.log(e)};

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          className={styles.task_container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={styles.task_card}>
            <div className={styles.task_card_left}></div>
            <div className={styles.task_card_right}>
              <Input
                bordered={false}
                defaultValue={task.title}
                maxLength={20}
                onChange={onTaskTitleChange}
                size={'middle'}
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              />
              <Input
                bordered={false}
                defaultValue={task.body}
                maxLength={50}
                onChange={onTaskBodyChange}
                size={'small'}
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  textAlign: 'center',
                }}
              />
            </div>
          </div>
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
