import React from 'react';
import { Tabs, Button, Space } from '../../src';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>标签一的内容</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>标签二的内容</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>标签三的内容</div> },
];

export default () => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <Tabs
      items={items}
      tabBarExtraContent={<Button type="primary" size="small">操作按钮</Button>}
    />
    <Tabs
      items={items}
      tabBarExtraContent={{
        left: <Button size="small">左侧</Button>,
        right: <Button size="small">右侧</Button>,
      }}
    />
  </Space>
);
