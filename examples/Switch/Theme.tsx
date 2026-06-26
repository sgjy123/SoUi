import React from 'react';
import { Switch, ConfigProvider } from '../../src';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>绿色主题</p>
        <ConfigProvider
          theme={{
            primaryColor: '#52c41a',
            primaryHoverColor: '#73d13d',
            components: {
              Switch: { borderRadius: 12 },
            },
          }}
        >
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Switch defaultChecked checkedChildren="开" unCheckedChildren="关" />
            <Switch defaultChecked size="small" />
            <Switch />
          </div>
        </ConfigProvider>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>紫色主题 + 方角</p>
        <ConfigProvider
          theme={{
            primaryColor: '#722ed1',
            primaryHoverColor: '#9254de',
            components: {
              Switch: { borderRadius: 4, colorBg: 'rgba(0,0,0,0.15)' },
            },
          }}
        >
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Switch defaultChecked checkedChildren="ON" unCheckedChildren="OFF" />
            <Switch defaultChecked size="small" />
            <Switch disabled defaultChecked />
          </div>
        </ConfigProvider>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义关闭态颜色</p>
        <ConfigProvider
          theme={{
            components: {
              Switch: { colorBg: '#d9d9d9', colorBgHover: '#bfbfbf' },
            },
          }}
        >
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <Switch />
            <Switch defaultChecked />
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};
