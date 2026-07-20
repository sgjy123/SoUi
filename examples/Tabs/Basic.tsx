import React from 'react';
import { Tabs } from '../../src';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>标签一的内容</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>标签二的内容</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>标签三的内容</div> },
];

export default () => <Tabs items={items} />;
