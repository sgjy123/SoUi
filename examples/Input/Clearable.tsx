import React from 'react';
import { Input, Space } from '../../src';

export default () => (
  <Space direction="vertical" size="middle" style={{ maxWidth: 400 }}>
    <Input placeholder="可清空的输入框" allowClear defaultValue="点击右侧图标清空内容" />
    <Input placeholder="自定义清空图标" allowClear={{ clearIcon: <span style={{ color: 'red', fontWeight: 'bold' }}>×</span> }} defaultValue="自定义清除图标" />
  </Space>
);
