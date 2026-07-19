import React, { useState } from 'react';
import { Tree } from '../../src';
import type { TreeNodeData } from '../../src';

const treeData: TreeNodeData[] = [
  {
    key: '0',
    title: '根节点 0',
    children: [
      { key: '0-0', title: '子节点 0-0' },
      { key: '0-1', title: '子节点 0-1' },
    ],
  },
  {
    key: '1',
    title: '根节点 1',
  },
  {
    key: '2',
    title: '根节点 2（叶子）',
    isLeaf: true,
  },
];

function updateTreeChildren(
  data: TreeNodeData[],
  key: React.Key,
  children: TreeNodeData[],
): TreeNodeData[] {
  return data.map((node) => {
    if (node.key === key) {
      return { ...node, children };
    }
    if (node.children) {
      return { ...node, children: updateTreeChildren(node.children, key, children) };
    }
    return node;
  });
}

export default () => {
  const [treeDataState, setTreeData] = useState<TreeNodeData[]>(treeData);
  const [loadedKeys, setLoadedKeys] = useState<Set<React.Key>>(new Set());

  const onLoadData = (node: TreeNodeData): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const children: TreeNodeData[] = [
          { key: `${node.key}-0`, title: `异步子节点 ${node.key}-0` },
          { key: `${node.key}-1`, title: `异步子节点 ${node.key}-1` },
          { key: `${node.key}-2`, title: `叶子节点 ${node.key}-2`, isLeaf: true },
        ];
        setTreeData((origin) => updateTreeChildren(origin, node.key, children));
        setLoadedKeys((prev) => new Set(prev).add(node.key));
        resolve();
      }, 1000);
    });
  };

  return (
    <div>
      <div style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
        点击展开箭头可异步加载子节点（1秒延迟）。已加载:{' '}
        {loadedKeys.size > 0
          ? Array.from(loadedKeys).map((k) => String(k)).join(', ')
          : '无'}
      </div>
      <Tree
        treeData={treeDataState}
        loadData={onLoadData}
        defaultExpandedKeys={[]}
      />
    </div>
  );
};
