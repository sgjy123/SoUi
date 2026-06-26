import React, { useState } from 'react';
import { Checkbox, ConfigProvider } from '../../src';

export default () => {
  const [val, setVal] = useState<string[]>(['react', 'vue']);
  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'Svelte', value: 'svelte' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>绿色主题</p>
        <ConfigProvider
          theme={{
            primaryColor: '#52c41a',
            primaryHoverColor: '#73d13d',
            components: {
              Checkbox: {
                borderRadius: 6,
              },
            },
          }}
        >
          <Checkbox.Group
            options={options}
            value={val}
            onChange={(v) => setVal(v as string[])}
          />
        </ConfigProvider>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>紫色主题 + 大圆角</p>
        <ConfigProvider
          theme={{
            primaryColor: '#722ed1',
            primaryHoverColor: '#9254de',
            components: {
              Checkbox: {
                borderRadius: 8,
                colorBorder: '#d9d9d9',
              },
            },
          }}
        >
          <div style={{ display: 'flex', gap: 12 }}>
            <Checkbox defaultChecked>选项 A</Checkbox>
            <Checkbox defaultChecked>选项 B</Checkbox>
            <Checkbox>选项 C</Checkbox>
            <Checkbox disabled>禁用</Checkbox>
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};
