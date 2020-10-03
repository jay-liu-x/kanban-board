import { Drawer, Button } from 'antd';

const TaskDetail = ({ show, onOk, onCancel, task }) => (
  <Modal
    title={task.title}
    visible={show}
    onOk={onOk}
    onCancel={onCancel}
  >
    <p>{task.text}</p>
    <p>{task.status}</p>
  </Modal>
);

export default TaskDetail;
