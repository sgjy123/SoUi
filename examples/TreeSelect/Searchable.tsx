import React from 'react';
import { TreeSelect } from '../../src';

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>可搜索</p>
        <TreeSelect allowClear showSearch treeData={treeData} placeholder="输入关键词搜索" />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>状态校验</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TreeSelect showSearch treeData={treeData} status="error" placeholder="错误状态" />
          <TreeSelect showSearch treeData={treeData} status="warning" placeholder="警告状态" />
        </div>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>不同尺寸</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <TreeSelect showSearch treeData={treeData} size="small" placeholder="小号" />
          <TreeSelect showSearch treeData={treeData} size="middle" placeholder="中号（默认）" />
          <TreeSelect showSearch treeData={treeData} size="large" placeholder="大号" />
        </div>
      </div>
    </div>
  );
};
