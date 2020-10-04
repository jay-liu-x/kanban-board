import { Drawer } from 'antd';

const TaskDetail = ({ task, visible, onClose }) => {
  return (
    <Drawer
      title={task.title}
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      <p>{task.body}</p>
      <p>{task.label}</p>
    </Drawer>
  );
};

export default TaskDetail;
