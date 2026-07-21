import React from 'react';
import { Dropdown, Button } from '../../src';

const items = [
  { key: '1', label: '菜单项一' },
  { key: '2', label: '菜单项二' },
  { key: '3', label: '菜单项三' },
];

export default () => (
  <Dropdown menu={{ items, onClick: ({ key }) => console.log('点击了:', key) }}>
    <Button type="primary">悬停展开</Button>
  </Dropdown>
);
