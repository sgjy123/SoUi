import React from 'react';
import { Alert, Space } from '../../src';

export default () => (
  <Space direction="vertical" size={12} style={{ width: '100%' }}>
    <Alert message="带图标的信息提示" type="info" showIcon />
    <Alert message="带图标的成功提示" type="success" showIcon />
    <Alert message="带图标的警告提示" type="warning" showIcon />
    <Alert message="带图标的错误提示" type="error" showIcon />
  </Space>
);
