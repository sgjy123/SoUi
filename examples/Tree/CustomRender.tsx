import React from 'react';
import { Tree } from '../../src';
import type { TreeNodeData } from '../../src';

const treeData: TreeNodeData[] = [
  {
    key: '1',
    title: '技术中心',
    icon: '🏢',
    children: [
      {
        key: '1-1',
        title: '前端团队',
        icon: '💻',
        children: [
          { key: '1-1-1', title: '张三', icon: '👨‍💻', extra: '高级工程师' },
          { key: '1-1-2', title: '李四', icon: '👩‍💻', extra: '中级工程师' },
        ],
      },
      {
        key: '1-2',
        title: '后端团队',
        icon: '⚙️',
        children: [
          { key: '1-2-1', title: '王五', icon: '👨‍💻', extra: '架构师' },
          { key: '1-2-2', title: '赵六', icon: '👩‍💻', extra: '高级工程师' },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '产品中心',
    icon: '📋',
    children: [
      { key: '2-1', title: '孙七', icon: '👤', extra: 'B端产品经理' },
      { key: '2-2', title: '周八', icon: '👤', extra: 'C端产品经理' },
    ],
  },
];

export default () => {
  const titleRender = (node: TreeNodeData) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      {node.icon && <span style={{ fontSize: 16 }}>{node.icon as string}</span>}
      <span>{node.title as string}</span>
      {node.extra && (
        <span
          style={{
            fontSize: 11,
            color: '#999',
            background: '#f5f5f5',
            padding: '1px 6px',
            borderRadius: 3,
          }}
        >
          {node.extra as string}
        </span>
      )}
    </span>
  );

  return (
    <div>
      <div style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
        通过 titleRender 自定义节点内容，支持图标、标签等富文本展示。
      </div>
      <Tree
        treeData={treeData}
        titleRender={titleRender}
        defaultExpandAll
      />
    </div>
  );
};
