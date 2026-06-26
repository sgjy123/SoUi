import React, { useState } from 'react';
import { Radio, ConfigProvider } from '../../src';

export default () => {
  const [val, setVal] = useState('react');

  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>绿色主题</p>
        <ConfigProvider
          theme={{
            primaryColor: '#52c41a',
            components: {
              Radio: {
                colorPrimary: '#52c41a',
                colorPrimaryHover: '#73d13d',
              },
            },
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Radio.Group
              options={options}
              value={val}
              onChange={(e) => setVal(e.target.value as string)}
            />
            <Radio.Group
              optionType="button"
              options={options}
              value={val}
              onChange={(e) => setVal(e.target.value as string)}
            />
            <Radio.Group
              optionType="button"
              buttonStyle="solid"
              options={options}
              value={val}
              onChange={(e) => setVal(e.target.value as string)}
            />
          </div>
        </ConfigProvider>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>紫色主题 + 大圆角按钮</p>
        <ConfigProvider
          theme={{
            primaryColor: '#722ed1',
            components: {
              Radio: {
                colorPrimary: '#722ed1',
                colorPrimaryHover: '#9254de',
                borderRadius: 10,
              },
            },
          }}
        >
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            options={options}
            defaultValue="vue"
          />
        </ConfigProvider>
      </div>
    </div>
  );
};
