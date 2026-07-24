import React from 'react';
import { Avatar, ConfigProvider, Icon } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>默认主题</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Avatar icon={<Icon name="User" />} />
        <Avatar>U</Avatar>
      </div>
    </div>
    <ConfigProvider
      theme={{
        components: {
          Avatar: {
            colorBg: '#1677ff',
            colorText: '#fff',
            borderRadius: 8,
          },
        },
      }}
    >
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义主题</p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Avatar icon={<Icon name="User" />} />
          <Avatar shape="square">U</Avatar>
        </div>
      </div>
    </ConfigProvider>
  </div>
);
