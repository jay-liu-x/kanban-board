import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { Error } from '../error';
import { GET_COLUMNS_AND_TASKS } from '../../utils/graphql/queries';
import {
  UPDATE_TASK_TITLE,
  UPDATE_TASK_BODY,
  DELETE_TASK,
} from '../../utils/graphql/mutations';
import { defaultUser } from '../../utils/constants';

import { Button, Input } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import styles from './task.module.scss';

const { TextArea } = Input;

const Task = ({ colId, task, index }) => {
  const [updateTaskTitle, { data: taskTitleUpdated }] = useMutation(
    UPDATE_TASK_TITLE
  );

  const [deleteTask, { data: taskDeleted }] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_COLUMNS_AND_TASKS }],
  });

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

  const onClickDeleteTask = (taskId) => {
    deleteTask({
      variables: {
        user: defaultUser,
        colId: colId,
        taskId: taskId,
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

  /* Delete task mutation response */
  if (taskDeleted === false) {
    return <Error errMsg={'Failed to delete task.'} />;
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
            <div className={styles.task_card_mid}>
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
              <TextArea
                autoSize
                bordered={false}
                defaultValue={task.body}
                maxLength={50}
                onChange={onTaskBodyChange}
                style={{
                  backgroundColor: 'transparent',
                  color: 'white',
                  textAlign: 'center',
                  resize: 'none',
                }}
              />
            </div>
            <Button
              className={styles.task_card_right}
              shape="circle"
              icon={<DeleteFilled />}
              onClick={() => {
                onClickDeleteTask(task._id);
              }}
              size={'small'}
              ghost
            />
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
