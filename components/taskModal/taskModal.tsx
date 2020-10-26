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
      title={task.title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>{task.body}</p>
      <p>{task.label}</p>
    </Modal>
  );
};

TaskModal.propTypes = {
  task: PropTypes.object,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
};

export default TaskModal;
