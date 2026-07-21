import React from 'react';
import { Dropdown, Button } from '../../src';

const items = [
  { key: '1', label: '菜单项一' },
  {
    key: 'sub1',
    label: '子菜单一',
    children: [
      { key: '1-1', label: '子菜单项 1-1' },
      { key: '1-2', label: '子菜单项 1-2' },
      {
        key: 'sub1-2',
        label: '三级菜单',
        children: [
          { key: '1-2-1', label: '三级菜单项 A' },
          { key: '1-2-2', label: '三级菜单项 B' },
        ],
      },
    ],
  },
  {
    key: 'sub2',
    label: '子菜单二',
    children: [
      { key: '2-1', label: '子菜单项 2-1' },
      { key: '2-2', label: '子菜单项 2-2', disabled: true },
    ],
  },
];

export default () => (
  <Dropdown menu={{ items, onClick: ({ key }) => console.log('点击了:', key) }}>
    <Button>多级菜单</Button>
  </Dropdown>
);
