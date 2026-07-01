import React, { useState } from 'react';
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
  const [value1, setValue1] = useState(['xihu', 'yuhang']);
  const [value2, setValue2] = useState(['zhejiang']);
  const [value3, setValue3] = useState(['hangzhou', 'xuanwu']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 500 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>可勾选（SHOW_CHILD，默认显示子节点）</p>
        <TreeSelect
          treeCheckable
          treeData={treeData}
          value={value1}
          onChange={(val) => setValue1(val)}
          placeholder="请勾选节点"
        />
        <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>已选: {value1.join(', ')}</p>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>显示父节点（SHOW_PARENT）</p>
        <TreeSelect
          treeCheckable
          showCheckedStrategy="SHOW_PARENT"
          treeData={treeData}
          value={value2}
          onChange={(val) => setValue2(val)}
          placeholder="请勾选节点"
        />
        <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>已选: {value2.join(', ')}</p>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>严格受控（treeCheckStrictly）</p>
        <TreeSelect
          treeCheckable
          treeCheckStrictly
          treeData={treeData}
          value={value3}
          onChange={(val) => setValue3(val)}
          placeholder="独立勾选节点"
        />
        <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>已选: {value3.join(', ')}</p>
      </div>
    </div>
  );
};
