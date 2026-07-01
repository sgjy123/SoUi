import React, { useMemo } from 'react';
import { TreeSelect } from '../../src';

interface LargeTreeNode {
  value: string;
  label: string;
  children: LargeTreeNode[];
}

export default function LargeDataDemo() {
  const treeData = useMemo<LargeTreeNode[]>(() => {
    const data: LargeTreeNode[] = [];
    for (let i = 0; i < 26; i += 1) {
      const letter = String.fromCharCode(65 + i);
      const children: LargeTreeNode[] = [];
      for (let j = 1; j <= 40; j += 1) {
        children.push({ value: `${letter}-${j}`, label: `${letter} 节点 ${j}`, children: [] });
      }
      data.push({ value: letter, label: `分类 ${letter}`, children });
    }
    return data;
  }, []);

  return (
    <div style={{ maxWidth: 400 }}>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
        大数据量（{treeData.length * 41} 个节点）
      </p>
      <TreeSelect
        treeData={treeData}
        showSearch
        multiple
        treeDefaultExpandAll={false}
        placeholder="请选择节点"
      />
    </div>
  );
}

