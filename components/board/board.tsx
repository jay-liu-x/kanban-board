import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../column/column';
import { GET_COLUMNS_AND_TASKS } from '../../utils/graphql/queries';
import {
  ADD_COLUMN,
  DELETE_COLUMN,
  UPDATE_COLUMNS,
} from '../../utils/graphql/mutations';
import { Loading } from '../loading';
import { Error } from '../error';
import { defaultUser } from '../../utils/constants';

import { Button } from 'antd';
import { PlusOutlined, DeleteFilled } from '@ant-design/icons';
import { Card } from 'antd';
import styles from './board.module.scss';

const Board = () => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);

  const { loading, error, data: boardData } = useQuery(GET_COLUMNS_AND_TASKS);

  const [addColumn, { data: colCreated }] = useMutation(ADD_COLUMN, {
    refetchQueries: [{ query: GET_COLUMNS_AND_TASKS }],
  });

  const [deleteColumn, { data: colDeleted }] = useMutation(DELETE_COLUMN, {
    refetchQueries: [{ query: GET_COLUMNS_AND_TASKS }],
  });

  const [updateColumns, { data: colsUpdated }] = useMutation(UPDATE_COLUMNS, {
    refetchQueries: [{ query: GET_COLUMNS_AND_TASKS }],
  });

  useEffect(() => {
    if (!loading && boardData) {
      setColumns(boardData.columns);
      setTasks(boardData.tasks);
    }
  }, [loading, boardData]);

  const onClickAddColumn = () => {
    addColumn({ variables: { user: defaultUser, colName: '' } });
  };

  const onClickDeleteColumn = (colId) => {
    deleteColumn({ variables: { user: defaultUser, colId: colId } });
  };

  /* Handles task dragging. */
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    // do nothing if not changing position of task
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // find start/source and finish/destination columns
    const start = columns.find((col) => col._id === source.droppableId);
    const finish = columns.find((col) => col._id === destination.droppableId);

    /* If start column equals finish column. */
    if (start === finish) {
      const newTaskIds: string[] = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1); // remove element with source index
      newTaskIds.splice(destination.index, 0, draggableId); // insert at new pos

      const newColumn = {
        ...start,
        taskIds: newTaskIds, // update task ids
      };

      // update new column in columns list
      const newColumns: object[] = [...columns];
      const newColumnIndex: number = newColumns.findIndex(
        (col: any) => col._id === newColumn._id
      ); // get index of new (updated) column

      newColumns[newColumnIndex] = newColumn;

      setColumns(newColumns);

      const cleanedColumns = cleanColumns(newColumns);
      updateColumns({ variables: { user: defaultUser, cols: cleanedColumns } });
      return;
    }

    /* Moving from one list to another */
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newColumns: object[] = [...columns];
    const newStartIndex: number = newColumns.findIndex(
      (col: any) => col._id === newStart._id
    );
    const newFinishIndex: number = newColumns.findIndex(
      (col: any) => col._id === newFinish._id
    );

    newColumns[newStartIndex] = newStart;
    newColumns[newFinishIndex] = newFinish;

    setColumns(newColumns);

    const cleanedColumns = cleanColumns(newColumns);
    updateColumns({ variables: { user: defaultUser, cols: cleanedColumns } });
  };

  /** Remove __typename property from each column in columns array. */
  const cleanColumns = (cols) => {
    // eslint-disable-next-line no-unused-vars
    return cols.map(({ __typename, ...item }) => item);
  };

  /* For boardData */
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error errMsg={'Failed to get board data.'} />;
  }

  /* Add column mutation response */
  // asserting to false instead of !colCreated because it may be null or other falsy values
  if (colCreated === false) {
    return <Error errMsg={'Failed to create new column.'} />;
  }

  /* Delete column mutation response */
  if (colDeleted === false) {
    return <Error errMsg={'Failed to delete column.'} />;
  }

  /* Update columns mutation response */
  if (colsUpdated === false) {
    return <Error errMsg={'Failed to update columns.'} />;
  }

  return columns && tasks ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.board_container}>
        {columns.map((column, index) => {
          return (
            <Card
              className={styles.column_container}
              bodyStyle={{ height: '100%' }}
              key={index}
              style={{ backgroundColor: '#3e526d', height: '100%' }}
            >
              <Column column={column} tasks={tasks} />
              <Button
                shape="circle"
                icon={<DeleteFilled />}
                style={{
                  position: 'relative',
                  left: '50%',
                  bottom: '20px',
                  transform: 'translate(-50%, -50%)',
                  margin: '0 auto',
                }}
                onClick={() => {
                  onClickDeleteColumn(column._id);
                }}
                ghost
              ></Button>
            </Card>
          );
        })}
        <Button
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
          style={{ marginLeft: 10 }}
          onClick={() => {
            onClickAddColumn();
          }}
        ></Button>
      </div>
    </DragDropContext>
  ) : null;
};

export default Board;
