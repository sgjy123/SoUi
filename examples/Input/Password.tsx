import React from 'react';
import { Input, Space } from '../../src';

const { Password } = Input;

export default () => (
  <Space direction="vertical" size="middle" style={{ maxWidth: 400 }}>
    <Password placeholder="输入密码" defaultValue="123456" />
    <Password placeholder="输入密码(大尺寸)" size="large" />
    <Password placeholder="禁用状态" disabled defaultValue="123456" />
  </Space>
);
