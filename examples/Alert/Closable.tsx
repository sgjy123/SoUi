import React from 'react';
import { Alert, Space } from '../../src';

export default () => (
  <Space direction="vertical" size={12} style={{ width: '100%' }}>
    <Alert message="可关闭的提示" type="info" closable />
    <Alert message="自定义关闭图标" type="success" closable closeIcon="✕" />
    <Alert message="带描述的关闭提示" description="这是一个带有描述文字的可关闭警告提示。" type="warning" closable showIcon />
  </Space>
);
