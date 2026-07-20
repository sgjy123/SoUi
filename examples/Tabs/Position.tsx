import React, { useState } from 'react';
import { Tabs, Radio, Space } from '../../src';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24, minHeight: 100 }}>标签一的内容</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24, minHeight: 100 }}>标签二的内容</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 24, minHeight: 100 }}>标签三的内容</div> },
];

export default () => {
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Radio.Group value={position} onChange={(e) => setPosition(e.target.value)}>
        <Radio.Button value="top">top</Radio.Button>
        <Radio.Button value="bottom">bottom</Radio.Button>
        <Radio.Button value="left">left</Radio.Button>
        <Radio.Button value="right">right</Radio.Button>
      </Radio.Group>
      <Tabs tabPosition={position} items={items} />
    </Space>
  );
};
