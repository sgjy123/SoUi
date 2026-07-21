import React from 'react';
import { Card, ConfigProvider, Space } from '../../src';

export default () => (
  <Space size={16} align="start">
    <Card title="默认主题" style={{ width: 260 }}>
      <p>默认样式的卡片。</p>
    </Card>
    <ConfigProvider
      theme={{
        components: {
          Card: {
            borderRadius: 16,
            headerBg: '#f0f5ff',
            borderColor: '#adc6ff',
            hoverShadow: '0 8px 24px rgba(47, 84, 235, 0.15)',
          },
        },
      }}
    >
      <Card title="自定义主题" hoverable style={{ width: 260 }}>
        <p>大圆角 + 蓝色边框 + 自定义阴影。</p>
      </Card>
    </ConfigProvider>
  </Space>
);
