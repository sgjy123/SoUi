import React, { useState } from 'react';
import { ColorPicker, ConfigProvider } from '../../src';

export default () => {
  const [color, setColor] = useState('#1677ff');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* 默认主题 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 60, fontSize: 14 }}>默认：</span>
        <ColorPicker value={color} onChange={setColor} />
      </div>

      {/* 自定义主题 */}
      <ConfigProvider
        theme={{
          components: {
            ColorPicker: {
              colorPrimary: '#52c41a',
              borderRadius: 10,
              colorBorder: '#b7eb8f',
            },
          },
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ minWidth: 60, fontSize: 14 }}>绿色主题：</span>
          <ColorPicker value={color} onChange={setColor} />
        </div>
      </ConfigProvider>

      {/* 紫色主题 + 大圆角 */}
      <ConfigProvider
        theme={{
          components: {
            ColorPicker: {
              colorPrimary: '#722ed1',
              borderRadius: 14,
              colorBorder: '#d3adf7',
            },
          },
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ minWidth: 60, fontSize: 14 }}>紫色主题：</span>
          <ColorPicker value={color} onChange={setColor} />
        </div>
      </ConfigProvider>
    </div>
  );
};
