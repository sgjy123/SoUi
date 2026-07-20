import React from 'react';
import { Tabs } from '../../src';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>卡片式标签一</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>卡片式标签二</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>卡片式标签三</div> },
];

export default () => <Tabs type="card" items={items} />;
