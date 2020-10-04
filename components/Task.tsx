import { Fragment, useState, useEffect, useRef } from 'react';
import { Card, Typography } from 'antd';
import styles from '../styles/Task.module.scss';

const { Title, Text } = Typography;

const Task = ({ task }) => {
  return (
    <Card className={styles.task_container}>
      <Title level={5}>{task.title}</Title>
      <Text>{task.body}</Text>
    </Card>
  );
};

export default Task;
