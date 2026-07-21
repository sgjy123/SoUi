import React from 'react';
import { Dropdown, Button, Space } from '../../src';

const items = [
  { key: 'edit', label: '编辑' },
  { key: 'copy', label: '复制' },
  { key: 'delete', label: '删除' },
];

export default () => (
  <Space>
    <Dropdown menu={{ items }} trigger={['click']}>
      <Button>点击触发</Button>
    </Dropdown>
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      <Button>右键触发</Button>
    </Dropdown>
    <Dropdown menu={{ items }} trigger={['hover', 'click']}>
      <Button>悬停+点击</Button>
    </Dropdown>
  </Space>
);
