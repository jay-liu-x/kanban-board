import PropTypes from 'prop-types';
import { Modal } from 'antd';

const TaskModal = ({ task, visible }) => {

  const handleOk = () => {
    // TODO: save edited data
  }

  const handleCancel = () => {
    // do nothing
  }

  return (
    <Modal
      title={task.task_title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>{task.task_body}</p>
    </Modal>
  );
};

TaskModal.propTypes = {
  task: PropTypes.object,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default TaskModal;
