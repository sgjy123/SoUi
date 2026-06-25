import React from 'react';
import { Input, Space } from '../../src';

export default () => (
  <Space direction="vertical" size="middle" style={{ maxWidth: 400 }}>
    <Input addonBefore="https://" addonAfter=".com" placeholder="输入域名" />
    <Input addonBefore="¥" placeholder="输入金额" />
    <Input addonAfter="搜索" placeholder="请输入关键词" />
  </Space>
);
