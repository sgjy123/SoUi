import React from 'react';
import { Dropdown, Button, Icon, Space } from '../../src';

const items = [
  { key: 'new', label: '新建文件', icon: <Icon name="Plus" size={14} /> },
  { key: 'open', label: '打开', icon: <Icon name="FolderOpen" size={14} /> },
  { key: 'save', label: '保存', icon: <Icon name="Save" size={14} /> },
  { key: 'divider-1', type: 'divider' as const },
  {
    key: 'group-1',
    type: 'group' as const,
    label: '分组标题',
    children: [
      { key: 'g1', label: '分组项一' },
      { key: 'g2', label: '分组项二' },
    ],
  },
  { key: 'divider-2', type: 'divider' as const },
  { key: 'disabled', label: '禁用项', disabled: true },
  { key: 'danger', label: '危险操作', danger: true },
];

export default () => (
  <Space>
    <Dropdown menu={{ items }}>
      <Button>图标/分组/分割线</Button>
    </Dropdown>
    <Dropdown menu={{ items }} disabled>
      <Button disabled>禁用下拉</Button>
    </Dropdown>
  </Space>
);
