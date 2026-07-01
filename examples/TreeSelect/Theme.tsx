import React from 'react';
import { TreeSelect, ConfigProvider } from '../../src';

const treeData = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'yuhang', label: '余杭区' },
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
      {
        value: 'suzhou',
        label: '苏州',
        children: [
          { value: 'gusu', label: '姑苏区' },
          { value: 'wuzhong', label: '吴中区' },
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
            components: { TreeSelect: { borderRadius: 8, optionSelectedBg: 'rgba(82, 196, 26, 0.08)' } },
          }}
        >
          <TreeSelect
            treeData={treeData}
            defaultValue="xihu"
            placeholder="请选择"
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
            components: { TreeSelect: { borderRadius: 10, colorBorder: '#d3adf7', optionSelectedBg: 'rgba(114, 46, 209, 0.08)' } },
          }}
        >
          <TreeSelect
            treeData={treeData}
            defaultValue="gusu"
            placeholder="请选择"
          />
        </ConfigProvider>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义尺寸</p>
        <ConfigProvider
          theme={{
            components: { TreeSelect: { controlHeight: 36, fontSize: 15, borderRadius: 4 } },
          }}
        >
          <TreeSelect treeData={treeData} placeholder="自定义控件高度和字号" />
        </ConfigProvider>
      </div>
    </div>
  );
};
