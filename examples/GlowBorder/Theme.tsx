import React from 'react';
import { GlowBorder, ConfigProvider } from '../../src';

/** 通过 ConfigProvider 自定义主题 */
const ThemeExample = () => (
  <ConfigProvider
    theme={{
      components: {
        GlowBorder: {
          colorPrimary: '#ff4d4f',
          colorSecondary: '#faad14',
          background: '#fff7e6',
          borderRadius: 16,
        },
      },
    }}
  >
    <GlowBorder glow={8} borderWidth={3}>
      <div style={{ padding: '24px 40px', textAlign: 'center' }}>
        主题定制
      </div>
    </GlowBorder>
  </ConfigProvider>
);

export default ThemeExample;
