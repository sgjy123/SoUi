import React from 'react';
import { Segmented, ConfigProvider } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>默认主题</p>
      <Segmented options={['日', '周', '月', '季', '年']} />
    </div>
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            trackBg: 'rgba(22, 119, 255, 0.08)',
            itemSelectedBg: '#1677ff',
            colorText: 'rgba(0, 0, 0, 0.65)',
            colorTextSelected: '#fff',
            borderRadius: 8,
          },
        },
      }}
    >
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义主题（主色滑块）</p>
        <Segmented defaultValue="week" options={['日', '周', '月', '季', '年']} />
      </div>
    </ConfigProvider>
  </div>
);
