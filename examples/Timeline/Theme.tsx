import React from 'react';
import { Timeline, ConfigProvider } from '../../src';

/** 通过 ConfigProvider 自定义主题 */
const ThemeExample = () => (
  <ConfigProvider
    theme={{
      components: {
        Timeline: {
          colorPrimary: '#722ed1',
          colorDot: '#722ed1',
          colorTail: '#d3adf7',
          fontSize: 16,
        },
      },
    }}
  >
    <Timeline
      items={[
        { children: '节点 A — 主色已定制' },
        { children: '节点 B — 线条颜色已定制' },
        { children: '节点 C — 字号已定制' },
      ]}
    />
  </ConfigProvider>
);

export default ThemeExample;
