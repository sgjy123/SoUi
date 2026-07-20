import React from 'react';
import { Tabs } from '../../src';

const items = Array.from({ length: 15 }, (_, i) => ({
  key: String(i + 1),
  label: `标签 ${i + 1}`,
  children: <div style={{ padding: 24 }}>标签 {i + 1} 的内容</div>,
}));

export default () => <Tabs items={items} />;
