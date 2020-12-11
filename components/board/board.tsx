import { Fragment, useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../column/column';
import { GET_COLUMNS_AND_TASKS } from '../../utils/graphql/queries';
import { ADD_COLUMN } from '../../utils/graphql/mutations';
import { Loading } from '../loading';
import { Error } from '../error';
import { defaultUser } from '../../utils/constants';

import { Button, Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './board.module.scss';

const Board = () => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);

  const { loading, error, data: boardData } = useQuery(GET_COLUMNS_AND_TASKS);

  const [addColumn, { data: newColCreated }] = useMutation(ADD_COLUMN, {
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
  };

  /* For boardData */
  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error errMsg={'Failed to get board data.'} />;
  }

  /* Add column mutation response */
  if (newColCreated === false) {
    return <Error errMsg={'Failed to create new column.'} />;
  }

  return columns && tasks ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24 }}
        className={styles.board_container}
      >
        <Fragment>
          {columns.map((column, index) => {
            return (
              <Col key={index} xs={24} sm={16} md={12} lg={8} xl={4}>
                <Column column={column} tasks={tasks} />
              </Col>
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
        </Fragment>
      </Row>
    </DragDropContext>
  ) : null;
};

export default Board;
