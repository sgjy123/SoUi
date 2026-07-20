import React from 'react';
import { Tabs, Space } from '../../src';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>标签一的内容</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>标签二的内容</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>标签三的内容</div> },
];

export default () => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <Tabs
      items={items}
      destroyInactiveTabPane
    />
    <Tabs
      type="card"
      items={items}
      tabBarStyle={{ background: '#fafafa', padding: '4px 8px 0', borderRadius: 6 }}
    />
  </Space>
);
