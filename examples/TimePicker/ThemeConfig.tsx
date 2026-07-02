import React from 'react';
import { TimePicker, ConfigProvider } from '../../src';

export default () => (
  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <ConfigProvider
      theme={{
        primaryColor: '#722ed1',
        primaryHoverColor: '#9254de',
        components: {
          TimePicker: {
            borderRadius: 8,
            colorPrimary: '#722ed1',
            colorPrimaryHover: '#9254de',
            colorBorderHover: '#9254de',
          },
        },
      }}
    >
      <TimePicker placeholder="紫色主题" />
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          TimePicker: {
            borderRadius: 12,
            colorPrimary: '#13c2c2',
            colorPrimaryHover: '#36cfc9',
            colorBorderHover: '#36cfc9',
          },
        },
      }}
    >
      <TimePicker placeholder="青色主题" />
    </ConfigProvider>
  </div>
);
