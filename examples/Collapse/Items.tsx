import React from 'react';
import { Collapse, Tag } from '../../src';

const items = [
  { key: '1', label: '配置项 items', children: '通过 items 属性配置面板，无需手写 Collapse.Panel。' },
  { key: '2', label: '带额外内容', extra: <Tag color="green">新</Tag>, children: '面板头右侧可放置 extra 额外内容。' },
  { key: '3', label: '箭头在右侧', children: 'expandIconPosition="end" 可将箭头放到右侧。' },
];

export default () => <Collapse items={items} expandIconPosition="end" defaultActiveKey={['1']} />;
