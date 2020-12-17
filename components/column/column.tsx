import { Fragment } from 'react';
import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import Task from '../task/task';
import { Droppable } from 'react-beautiful-dnd';
import { Error } from '../error';
import { GET_COLUMNS_AND_TASKS } from '../../utils/graphql/queries';
import { ADD_TASK, UPDATE_COLUMN_NAME } from '../../utils/graphql/mutations';
import { defaultUser } from '../../utils/constants';

import { Button, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './column.module.scss';

const Column = ({ column, tasks }) => {
  const [addTask, { data: taskCreated }] = useMutation(ADD_TASK, {
    refetchQueries: [{ query: GET_COLUMNS_AND_TASKS }],
  });

  const [updateColumnName, { data: colNameUpdated }] = useMutation(
    UPDATE_COLUMN_NAME
  );

  const onClickAddTask = () => {
    addTask({
      variables: {
        user: defaultUser,
        colId: column._id,
        taskTitle: 'Edit here',
        taskBody: 'Type something here...',
      },
    });
  };

  const onColNameChange = (e) => {
    updateColumnName({
      variables: {
        user: defaultUser,
        colId: column._id,
        colName: e.target.value,
      },
    });
  };

  /* Add task mutation response */
  if (taskCreated === false) {
    return <Error errMsg={'Failed to create new task.'} />;
  }

  /* Update column mutation response */
  if (colNameUpdated === false) {
    return <Error errMsg={'Failed to update column name.'} />;
  }

  return (
    <Droppable droppableId={column._id}>
      {(provided) => (
        <div
          className={styles.column}
          title={column.name}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Input
            defaultValue={column.name}
            maxLength={20}
            onChange={onColNameChange}
            size={'large'}
            style={{
              color: 'white',
              backgroundColor: 'transparent',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          />
          {column.taskIds.map((taskId, index) => {
            // only get the tasks belonging to current column
            const task = tasks.find((task) => task._id === taskId);
            return task ? (
              <Fragment key={taskId}>
                <Task colId={column._id} task={task} index={index} />
              </Fragment>
            ) : null;
          })}
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            size="small"
            onClick={() => {
              onClickAddTask();
            }}
          />
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
