import React, { useState } from 'react';
import { TreeSelect } from '../../src';

const treeData = [
  {
    value: 'parent-1',
    label: '父节点 1',
    children: [
      {
        value: 'child-1-1',
        label: '子节点 1-1',
        children: [
          { value: 'leaf-1-1-1', label: '叶子 1-1-1' },
          { value: 'leaf-1-1-2', label: '叶子 1-1-2' },
        ],
      },
      { value: 'child-1-2', label: '子节点 1-2' },
    ],
  },
  {
    value: 'parent-2',
    label: '父节点 2',
    children: [
      {
        value: 'child-2-1',
        label: '子节点 2-1',
        children: [
          { value: 'leaf-2-1-1', label: '叶子 2-1-1' },
          { value: 'leaf-2-1-2', label: '叶子 2-1-2' },
        ],
      },
    ],
  },
];

export default function ControlledExpandedDemo() {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['parent-1']);
  const [value, setValue] = useState('leaf-1-1-1');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>受控展开</p>
        <TreeSelect
          treeData={treeData}
          value={value}
          onChange={(val) => setValue(val)}
          treeExpandedKeys={expandedKeys}
          onTreeExpand={(keys) => setExpandedKeys(keys)}
          placeholder="请选择"
        />
      </div>
      <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
        当前展开: {expandedKeys.join(', ')}
      </div>
    </div>
  );
}

