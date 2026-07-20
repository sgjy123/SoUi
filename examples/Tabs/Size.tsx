import React from 'react';
import { Tabs, Space } from '../../src';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 16 }}>内容一</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 16 }}>内容二</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 16 }}>内容三</div> },
];

export default () => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <Tabs size="small" items={items} />
    <Tabs size="middle" items={items} />
    <Tabs size="large" items={items} />
  </Space>
);
