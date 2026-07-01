import React, { useState } from 'react';
import { TreeSelect } from '../../src';
import type { TreeSelectOption } from '../../src';

const initialData: TreeSelectOption[] = [
  { value: '0-0', label: '异步节点 1', isLeaf: false },
  { value: '0-1', label: '异步节点 2', isLeaf: false },
  { value: '0-2', label: '叶子节点', isLeaf: true },
];

export default function AsyncLoadDemo() {
  const [treeData, setTreeData] = useState<TreeSelectOption[]>(initialData);

  const loadData = (node: TreeSelectOption) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newChildren: TreeSelectOption[] = [
          { value: `${node.value}-0`, label: `${node.label} 的子节点 1`, isLeaf: true },
          { value: `${node.value}-1`, label: `${node.label} 的子节点 2`, isLeaf: true },
        ];
        setTreeData((prev) => {
          const next = [...prev];
          const walk = (list: TreeSelectOption[]): TreeSelectOption | undefined => {
            for (let i = 0; i < list.length; i += 1) {
              if (list[i].value === node.value) return list[i];
              if (list[i].children) {
                const found = walk(list[i].children!);
                if (found) return found;
              }
            }
            return undefined;
          };
          const target = walk(next);
          if (target) {
            target.children = newChildren;
            target.isLeaf = false;
          }
          return next;
        });
        resolve();
      }, 800);
    });
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>点击展开图标异步加载子节点</p>
      <TreeSelect
        treeData={treeData}
        loadData={loadData}
        placeholder="请选择"
        showSearch
        allowClear
      />
    </div>
  );
}

