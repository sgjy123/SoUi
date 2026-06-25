import React from 'react';
import { Input, Space } from '../../src';

export default () => (
  <Space direction="vertical" size="middle" style={{ maxWidth: 400 }}>
    <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
      <Input placeholder="无边框输入框" bordered={false} style={{ background: '#fff', borderRadius: 6 }} />
    </div>
    <div style={{ padding: 16, background: '#e6f4ff', borderRadius: 8 }}>
      <Input placeholder="Bordered=false 在浅色背景上" bordered={false} />
    </div>
    <Input borderless placeholder="完全无边框（borderless）" />
  </Space>
);
