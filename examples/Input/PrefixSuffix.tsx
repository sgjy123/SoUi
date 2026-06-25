import React from 'react';
import { Input, Icon, Space } from '../../src';

export default () => (
  <Space direction="vertical" size="middle" style={{ maxWidth: 400 }}>
    <Input prefix={<Icon name="User" size={16} />} placeholder="用户名" />
    <Input suffix={<Icon name="Search" size={16} />} placeholder="搜索内容" />
    <Input prefix="¥" suffix="RMB" placeholder="金额" />
  </Space>
);
