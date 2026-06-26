import React from 'react';
import { Cascader, ConfigProvider } from '../../src';

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'binjiang', label: '滨江区' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波',
        children: [
          { value: 'haishu', label: '海曙区' },
          { value: 'jiangbei', label: '江北区' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          { value: 'xuanwu', label: '玄武区' },
          { value: 'qinhuai', label: '秦淮区' },
        ],
      },
    ],
  },
];

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>绿色主题</p>
        <ConfigProvider
          theme={{
            primaryColor: '#52c41a',
            primaryHoverColor: '#73d13d',
            components: {
              Cascader: { borderRadius: 8, optionSelectedBg: 'rgba(82, 196, 26, 0.08)' },
            },
          }}
        >
          <Cascader
            options={options}
            defaultValue={['zhejiang', 'hangzhou', 'xihu']}
            placeholder="请选择地址"
            showSearch
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
              Cascader: {
                borderRadius: 10,
                colorBorder: '#d3adf7',
                optionSelectedBg: 'rgba(114, 46, 209, 0.08)',
              },
            },
          }}
        >
          <Cascader
            options={options}
            defaultValue={['jiangsu', 'nanjing', 'xuanwu']}
            placeholder="请选择地址"
          />
        </ConfigProvider>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义尺寸</p>
        <ConfigProvider
          theme={{
            components: {
              Cascader: { controlHeight: 36, fontSize: 15, borderRadius: 4 },
            },
          }}
        >
          <Cascader
            options={options}
            placeholder="自定义控件高度和字号"
          />
        </ConfigProvider>
      </div>
    </div>
  );
};
