import { useMutation } from '@apollo/client';
import PropTypes from 'prop-types';
import Task from '../task/task';
import { Droppable } from 'react-beautiful-dnd';
import { Error } from '../error';
import { UPDATE_COLUMN_NAME } from '../../utils/graphql/mutations';
import { defaultUser } from '../../utils/constants';

import { Input } from 'antd';
import styles from './column.module.scss';

const Column = ({ column, tasks }) => {
  const [updateColumnName, { data: colNameUpdated }] = useMutation(
    UPDATE_COLUMN_NAME
  );

  const onColNameChange = (e) => {
    updateColumnName({
      variables: {
        user: defaultUser,
        colId: column._id,
        colName: e.target.value,
      },
    });
  };

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
            const task: object = tasks.find((task) => task._id === taskId);
            return <Task key={taskId} task={task} index={index} />;
          })}
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
