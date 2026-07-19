import React, { useState, useMemo } from 'react';
import { Tree, Input, Space } from '../../src';
import type { TreeNodeData } from '../../src';

const treeData: TreeNodeData[] = [
  {
    key: '1',
    title: '技术中心',
    children: [
      {
        key: '1-1',
        title: '前端团队',
        children: [
          { key: '1-1-1', title: '张三 - React 方向' },
          { key: '1-1-2', title: '李四 - Vue 方向' },
          { key: '1-1-3', title: '王小明 - Angular 方向' },
        ],
      },
      {
        key: '1-2',
        title: '后端团队',
        children: [
          { key: '1-2-1', title: '王五 - Java 方向' },
          { key: '1-2-2', title: '赵六 - Go 方向' },
          { key: '1-2-3', title: '钱七 - Python 方向' },
        ],
      },
      {
        key: '1-3',
        title: '测试团队',
        children: [
          { key: '1-3-1', title: '孙八 - 自动化测试' },
          { key: '1-3-2', title: '周九 - 性能测试' },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '产品中心',
    children: [
      { key: '2-1', title: '产品经理 - B端' },
      { key: '2-2', title: '产品经理 - C端' },
      { key: '2-3', title: '数据分析师' },
    ],
  },
  {
    key: '3',
    title: '设计中心',
    children: [
      { key: '3-1', title: 'UI 设计师' },
      { key: '3-2', title: 'UX 设计师' },
      { key: '3-3', title: '视觉设计师' },
    ],
  },
];

const getParentKey = (key: React.Key, tree: TreeNodeData[]): React.Key | null => {
  for (const node of tree) {
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        return node.key;
      }
      const result = getParentKey(key, node.children);
      if (result !== null) return result;
    }
  }
  return null;
};

const getAllKeys = (tree: TreeNodeData[]): React.Key[] => {
  const keys: React.Key[] = [];
  const walk = (nodes: TreeNodeData[]) => {
    for (const node of nodes) {
      keys.push(node.key);
      if (node.children) walk(node.children);
    }
  };
  walk(tree);
  return keys;
};

const countMatches = (tree: TreeNodeData[], value: string): number => {
  let count = 0;
  const walk = (nodes: TreeNodeData[]) => {
    for (const node of nodes) {
      if (typeof node.title === 'string' && node.title.toLowerCase().includes(value.toLowerCase())) {
        count++;
      }
      if (node.children) walk(node.children);
    }
  };
  walk(tree);
  return count;
};

export default () => {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const matchCount = useMemo(
    () => (searchValue ? countMatches(treeData, searchValue) : 0),
    [searchValue],
  );

  const allKeys = useMemo(() => getAllKeys(treeData), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    if (value && autoExpandParent) {
      const keys: React.Key[] = [];
      const findMatchKeys = (data: TreeNodeData[]) => {
        data.forEach((item) => {
          if (typeof item.title === 'string' && item.title.toLowerCase().includes(value.toLowerCase())) {
            const parentKey = getParentKey(item.key, treeData);
            if (parentKey) keys.push(parentKey);
          }
          if (item.children) findMatchKeys(item.children);
        });
      };
      findMatchKeys(treeData);
      setExpandedKeys([...new Set(keys)]);
    }
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }} wrap>
        <Input
          placeholder="搜索节点（如：前端、张三、设计）"
          value={searchValue}
          onChange={handleChange}
          style={{ width: 300 }}
          allowClear
        />
        <span>自动展开父节点:</span>
        <input
          type="checkbox"
          checked={autoExpandParent}
          onChange={() => setAutoExpandParent(!autoExpandParent)}
        />
        {searchValue && (
          <span
            style={{
              padding: '2px 8px',
              borderRadius: 4,
              fontSize: 12,
              background: matchCount > 0 ? '#f6ffed' : '#fff2f0',
              color: matchCount > 0 ? '#52c41a' : '#ff4d4f',
              border: `1px solid ${matchCount > 0 ? '#b7eb8f' : '#ffccc7'}`,
            }}
          >
            {matchCount > 0 ? `匹配 ${matchCount} 个节点` : '无匹配'}
          </span>
        )}
      </Space>

      <Tree
        treeData={treeData}
        expandedKeys={expandedKeys}
        onExpand={(keys) => setExpandedKeys(keys)}
        searchValue={searchValue}
      />
    </div>
  );
};
