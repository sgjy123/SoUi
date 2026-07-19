import React, { useState } from 'react';
import { Tree, Space, Switch } from '../../src';
import type { TreeNodeData } from '../../src';

const treeData: TreeNodeData[] = [
  {
    key: '0-0',
    title: '项目开发',
    children: [
      {
        key: '0-0-0',
        title: '前端开发',
        children: [
          { key: '0-0-0-0', title: 'React 组件开发' },
          { key: '0-0-0-1', title: '样式优化' },
        ],
      },
      {
        key: '0-0-1',
        title: '后端开发',
        children: [
          { key: '0-0-1-0', title: 'API 接口开发' },
          { key: '0-0-1-1', title: '数据库设计', disabled: true },
          { key: '0-0-1-2', title: '缓存方案', disableCheckbox: true },
        ],
      },
      {
        key: '0-0-2',
        title: '测试',
        children: [
          { key: '0-0-2-0', title: '单元测试' },
          { key: '0-0-2-1', title: '集成测试' },
        ],
      },
    ],
  },
  {
    key: '0-1',
    title: '文档编写',
    children: [
      { key: '0-1-0', title: '技术文档' },
      { key: '0-1-1', title: '用户手册' },
    ],
  },
  {
    key: '0-2',
    title: '运维部署',
    isLeaf: true,
  },
];

export default () => {
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0-0']);
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [halfCheckedKeys, setHalfCheckedKeys] = useState<React.Key[]>([]);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <span>严格模式（父子不联动）:</span>
        <Switch checked={checkStrictly} onChange={() => setCheckStrictly(!checkStrictly)} />
      </Space>

      <div style={{ display: 'flex', gap: 32 }}>
        <Tree
          checkable
          checkStrictly={checkStrictly}
          treeData={treeData}
          checkedKeys={checkedKeys}
          onCheck={(keys, info) => {
            console.log('勾选:', keys, '半选:', info.halfCheckedKeys);
            setCheckedKeys(keys);
            setHalfCheckedKeys(info.halfCheckedKeys);
          }}
          defaultExpandedKeys={['0-0', '0-0-0', '0-0-1', '0-0-2']}
        />

        <div style={{ minWidth: 200, fontSize: 13 }}>
          <div style={{ marginBottom: 8, fontWeight: 500 }}>当前状态:</div>
          <div style={{ color: '#666', marginBottom: 4 }}>
            已勾选 ({checkedKeys.length}):
          </div>
          <div style={{ wordBreak: 'break-all', color: '#1677ff', marginBottom: 12 }}>
            [{checkedKeys.map((k) => `'${k}'`).join(', ')}]
          </div>
          <div style={{ color: '#666', marginBottom: 4 }}>
            半选 ({halfCheckedKeys.length}):
          </div>
          <div style={{ wordBreak: 'break-all', color: '#faad14' }}>
            [{halfCheckedKeys.map((k) => `'${k}'`).join(', ')}]
          </div>
        </div>
      </div>
    </div>
  );
};
