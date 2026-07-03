import React from 'react';
import Slider from '../../src/components/Slider';
import ConfigProvider from '../../src/components/ConfigProvider';

const ThemeConfig: React.FC = () => (
  <div style={{ width: 400 }}>
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            colorPrimary: '#722ed1',
            colorPrimaryHover: '#9254de',
            handleSize: 18,
            railSize: 6,
            trackBg: '#722ed1',
            handleColor: '#f9f0ff',
          },
        },
      }}
    >
      <p>自定义紫色主题</p>
      <Slider defaultValue={40} />
      <Slider range defaultValue={[20, 70]} style={{ marginTop: 24 }} />
    </ConfigProvider>
  </div>
);

export default ThemeConfig;
