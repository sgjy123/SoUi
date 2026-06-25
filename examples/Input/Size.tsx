import React from 'react';
import { Input, Space } from '../../src';

export default () => (
  <Space direction="vertical" size="middle" style={{ maxWidth: 400 }}>
    <Input size="small" placeholder="Small 小尺寸" />
    <Input size="middle" placeholder="Middle 中尺寸（默认）" />
    <Input size="large" placeholder="Large 大尺寸" />
  </Space>
);
