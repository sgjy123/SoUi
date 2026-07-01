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
        disabled: true,
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'yuhang', label: '余杭区' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波',
        children: [
          { value: 'haishu', label: '海曙区', disabled: true },
          { value: 'jiangbei', label: '江北区' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    disabled: true,
    children: [
      { value: 'nanjing', label: '南京' },
      { value: 'suzhou', label: '苏州' },
    ],
  },
];

export default function DisabledNodesDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>单选时禁用节点不可选</p>
        <TreeSelect treeData={treeData} placeholder="请选择" defaultValue="xihu" />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>多选时禁用节点不可选</p>
        <TreeSelect
          multiple
          treeData={treeData}
          placeholder="请选择"
          defaultValue={['jiangbei', 'nanjing']}
        />
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>勾选模式禁用节点不参与联动</p>
        <TreeSelect
          treeCheckable
          treeData={treeData}
          placeholder="请勾选"
          defaultValue={['jiangbei']}
        />
      </div>
    </div>
  );
}

