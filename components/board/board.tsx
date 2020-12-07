import { Fragment, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../column/column';
import { GET_COLUMNS_AND_TASKS } from '../../utils/queries';
import { Loading } from '../loading';
import { Error } from '../error';

import { Button, Col, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './board.module.scss';

const Board = () => {
  const [columns, setColumns] = useState();
  const [tasks, setTasks] = useState();

  const { loading, error, data } = useQuery(GET_COLUMNS_AND_TASKS);

  useEffect(() => {
    if (!loading && data) {
      setColumns(data.columns);
      setTasks(data.tasks);
    }
  }, [loading, data]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

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
      const newColumnId: string = newColumns.findIndex(
        (col) => col._id === newColumn._id
      ); // get index of new (updated) column

      newColumns[newColumnId] = newColumn;

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
    const newStartId: string = newColumns.findIndex(
      (col) => col._id === newStart._id
    );
    const newFinishId: string = newColumns.findIndex(
      (col) => col._id === newFinish._id
    );

    newColumns[newStartId] = newStart;
    newColumns[newFinishId] = newFinish;

    setColumns(newColumns);
  };

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
          ></Button>
        </Fragment>
      </Row>
    </DragDropContext>
  ) : null;
};

export default Board;
