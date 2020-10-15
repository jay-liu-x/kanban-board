import PropTypes from 'prop-types';
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

TaskDetail.propTypes = {
  task: PropTypes.object,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default TaskDetail;
