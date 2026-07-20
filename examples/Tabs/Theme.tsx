import React from 'react';
import { Tabs, ConfigProvider } from '../../src';

const items = [
  { key: '1', label: '标签一', children: <div style={{ padding: 24 }}>自定义主题标签一</div> },
  { key: '2', label: '标签二', children: <div style={{ padding: 24 }}>自定义主题标签二</div> },
  { key: '3', label: '标签三', children: <div style={{ padding: 24 }}>自定义主题标签三</div> },
];

export default () => (
  <ConfigProvider
    theme={{
      primaryColor: '#722ed1',
      components: {
        Tabs: {
          colorPrimary: '#722ed1',
          fontSize: 15,
          borderRadius: 8,
          cardBg: '#f9f0ff',
        },
      },
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Tabs items={items} />
      <Tabs type="card" items={items} />
    </div>
  </ConfigProvider>
);
