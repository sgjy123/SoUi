import React, { useState } from 'react';
import { Tabs, Space, Button } from '../../src';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>标签一的内容</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>标签二的内容</div> },
  { key: '3', label: '标签三', disabled: true, children: <div style={{ padding: 24 }}>标签三（禁用）</div> },
];

export default () => {
  const [activeKey, setActiveKey] = useState('1');

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Space>
        <Button size="small" onClick={() => setActiveKey('1')}>激活标签一</Button>
        <Button size="small" onClick={() => setActiveKey('2')}>激活标签二</Button>
      </Space>
      <Tabs
        activeKey={activeKey}
        onChange={setActiveKey}
        items={items}
      />
    </Space>
  );
};
