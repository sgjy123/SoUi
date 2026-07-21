import React from 'react';
import { Dropdown, Button, Input } from '../../src';

const items = [
  { key: '1', label: '菜单项一' },
  { key: '2', label: '菜单项二' },
];

export default () => (
  <Dropdown
    menu={{ items }}
    trigger={['click']}
    dropdownRender={(menu) => (
      <div>
        <div style={{ padding: 8 }}>
          <Input placeholder="搜索菜单项..." />
        </div>
        {menu}
        <div
          style={{
            padding: '8px 12px',
            borderTop: '1px solid #f0f0f0',
            color: '#1677ff',
            cursor: 'pointer',
          }}
        >
          + 新增菜单项
        </div>
      </div>
    )}
  >
    <Button>自定义渲染</Button>
  </Dropdown>
);
