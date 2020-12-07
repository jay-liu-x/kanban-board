import { Alert } from 'antd';

export const Error = (errMsg) => (
  <Alert
    message="Error"
    description={errMsg}
    type="error"
    showIcon
  />
);
