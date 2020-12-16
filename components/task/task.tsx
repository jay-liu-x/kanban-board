import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { Error } from '../error';
import {
  UPDATE_TASK_TITLE,
  UPDATE_TASK_BODY,
} from '../../utils/graphql/mutations';
import { defaultUser } from '../../utils/constants';

import { Input } from 'antd';
import styles from './task.module.scss';

const Task = ({ task, index }) => {
  const [updateTaskTitle, { data: taskTitleUpdated }] = useMutation(
    UPDATE_TASK_TITLE
  );

  const onTaskTitleChange = (e) => {
    updateTaskTitle({
      variables: {
        user: defaultUser,
        taskId: task._id,
        taskTitle: e.target.value,
      },
    });
  };

  const [updateTaskBody, { data: taskBodyUpdated }] = useMutation(
    UPDATE_TASK_BODY
  );

  const onTaskBodyChange = (e) => {
    updateTaskBody({
      variables: {
        user: defaultUser,
        taskId: task._id,
        taskBody: e.target.value,
      },
    });
  };

  /* Update task title mutation response */
  if (taskTitleUpdated === false) {
    return <Error errMsg={'Failed to update task Title.'} />;
  }

  /* Update task body mutation response */
  if (taskBodyUpdated === false) {
    return <Error errMsg={'Failed to update task body.'} />;
  }

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
