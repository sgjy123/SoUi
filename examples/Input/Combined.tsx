import React from 'react';
import { Input, Space, Icon } from '../../src';

export default () => (
  <Space direction="vertical" size="middle" style={{ maxWidth: 400 }}>
    <Input
      placeholder="综合示例：带前缀和清空功能"
      prefix={<Icon name="User" size={16} />}
      allowClear
      defaultValue="Hello"
    />
    <Input
      placeholder="showCount + maxLength"
      showCount
      maxLength={20}
      defaultValue="已有8个字"
      allowClear
    />
    <Input
      placeholder="带前后置标签 + 前缀"
      addonBefore="https://"
      addonAfter=".com"
      prefix={<Icon name="Globe" size={16} />}
      allowClear
      defaultValue="example"
    />
  </Space>
);
