import { Fragment, useState, useEffect, useRef } from 'react';
import { Typography } from 'antd';
import styles from '../styles/Task.module.scss';

const { Title, Text } = Typography;

const Task = ({ task }) => {
  return (
    <div className={styles.task_container}>
      <Title level={5}>{task.title}</Title>
      <Text>{task.body}</Text>
    </div>
  );
};

export default Task;
