import React from 'react';
import { Select, ConfigProvider } from '../../src';

export default () => {
  const options = [
    { label: '选项一', value: 'option1' },
    { label: '选项二', value: 'option2' },
    { label: '选项三', value: 'option3' },
    { label: '选项四', value: 'option4' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>绿色主题 + 大圆角</p>
        <ConfigProvider
          theme={{
            primaryColor: '#52c41a',
            borderRadius: 8,
            components: {
              Select: {
                borderRadius: 10,
                optionSelectedBg: 'rgba(82, 196, 26, 0.1)',
              },
            },
          }}
        >
          <div style={{ maxWidth: 300 }}>
            <Select
              placeholder="绿色主题选择器"
              defaultValue="option1"
              options={options}
            />
          </div>
        </ConfigProvider>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>紫色主题 + 自定义边框颜色</p>
        <ConfigProvider
          theme={{
            primaryColor: '#722ed1',
            components: {
              Select: {
                colorBorder: '#d3adf7',
                colorBorderHover: '#b37feb',
                colorBorderFocus: '#722ed1',
                optionSelectedBg: 'rgba(114, 46, 209, 0.08)',
                tagBg: '#f9f0ff',
              },
            },
          }}
        >
          <div style={{ maxWidth: 300 }}>
            <Select
              mode="multiple"
              placeholder="紫色主题多选"
              defaultValue={['option1', 'option2']}
              options={options}
            />
          </div>
        </ConfigProvider>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义字号和高度</p>
        <ConfigProvider
          theme={{
            components: {
              Select: {
                fontSize: 16,
                controlHeight: 40,
              },
            },
          }}
        >
          <div style={{ maxWidth: 300 }}>
            <Select
              placeholder="大号字体和高度"
              defaultValue="option1"
              options={options}
            />
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};
