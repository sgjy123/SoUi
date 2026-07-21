import React from 'react';
import { Dropdown, Button, Space, ConfigProvider } from '../../src';

const items = [
  { key: '1', label: '菜单项一' },
  { key: '2', label: '菜单项二' },
  { key: '3', label: '危险操作', danger: true },
];

export default () => (
  <Space>
    <ConfigProvider
      theme={{
        primaryColor: '#722ed1',
        components: {
          Dropdown: {
            borderRadius: 12,
            itemHoverBg: 'rgba(114, 46, 209, 0.08)',
          },
        },
      }}
    >
      <Dropdown menu={{ items }} arrow>
        <Button>紫色主题 + 圆角</Button>
      </Dropdown>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Dropdown: {
            colorBg: '#1f1f1f',
            itemHoverBg: 'rgba(255, 255, 255, 0.08)',
            fontSize: 13,
          },
        },
      }}
    >
      <Dropdown menu={{ items }}>
        <Button>暗色面板</Button>
      </Dropdown>
    </ConfigProvider>
  </Space>
);
