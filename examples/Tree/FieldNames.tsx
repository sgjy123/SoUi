import React from 'react';
import { Tree } from '../../src';

const treeData = [
  {
    id: 'dept-1',
    name: '技术中心',
    subordinates: [
      {
        id: 'dept-1-1',
        name: '前端团队',
        subordinates: [
          { id: 'emp-001', name: '张三', leaf: true },
          { id: 'emp-002', name: '李四', leaf: true },
        ],
      },
      {
        id: 'dept-1-2',
        name: '后端团队',
        subordinates: [
          { id: 'emp-003', name: '王五', leaf: true },
          { id: 'emp-004', name: '赵六', leaf: true },
        ],
      },
    ],
  },
  {
    id: 'dept-2',
    name: '产品中心',
    subordinates: [
      { id: 'emp-005', name: '孙七', leaf: true },
      { id: 'emp-006', name: '周八', leaf: true },
    ],
  },
];

export default () => (
  <div>
    <div style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
      通过 fieldNames 映射字段名，适配后端数据结构：name → title, id → key, subordinates → children, leaf → isLeaf。
    </div>
    <Tree
      treeData={treeData as any}
      fieldNames={{ title: 'name', key: 'id', children: 'subordinates', isLeaf: 'leaf' }}
      defaultExpandAll
      onSelect={(keys) => console.log('选中:', keys)}
    />
  </div>
);
