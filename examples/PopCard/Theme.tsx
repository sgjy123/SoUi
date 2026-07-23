import React from 'react';
import { PopCard, Button, ConfigProvider } from '../../src';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        PopCard: {
          colorBg: '#f0f5ff',
          borderRadius: 12,
          boxShadow: '0 8px 24px rgba(47, 84, 235, 0.2)',
        },
      },
    }}
  >
    <PopCard title="自定义主题" content={<div style={{ margin: 0 }}>自定义背景、圆角与阴影。</div>}>
      <Button type="primary">悬停查看</Button>
    </PopCard>
  </ConfigProvider>
);
