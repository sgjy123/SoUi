import React from 'react';
import { Input, Space } from '../../src';

export default () => (
  <Space direction="vertical" size="middle" style={{ maxWidth: 400 }}>
    <Input placeholder="默认状态" />
    <Input placeholder="错误状态" status="error" defaultValue="错误内容" />
    <Input placeholder="警告状态" status="warning" defaultValue="警告内容" />
  </Space>
);
