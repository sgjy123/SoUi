import React from 'react';
import { Dropdown, Button, Space } from '../../src';

const items = [
  { key: '1', label: '菜单项一' },
  { key: '2', label: '菜单项二' },
  { key: '3', label: '菜单项三' },
];

const placements = [
  'bottomLeft',
  'bottomCenter',
  'bottomRight',
  'topLeft',
  'topCenter',
  'topRight',
] as const;

export default () => (
  <Space wrap>
    {placements.map((p) => (
      <Dropdown key={p} menu={{ items }} placement={p}>
        <Button>{p}</Button>
      </Dropdown>
    ))}
  </Space>
);
