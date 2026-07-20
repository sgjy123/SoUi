import React from 'react';
import { Tabs, Icon } from '../../src';

const items = [
  { key: '1', label: '首页', icon: <Icon name="Home" size={16} />, children: <div style={{ padding: 24 }}>首页内容</div> },
  { key: '2', label: '设置', icon: <Icon name="Setting" size={16} />, children: <div style={{ padding: 24 }}>设置内容</div> },
  { key: '3', label: '消息', icon: <Icon name="Mail" size={16} />, children: <div style={{ padding: 24 }}>消息内容</div> },
];

export default () => (
  <Tabs items={items} centered />
);
