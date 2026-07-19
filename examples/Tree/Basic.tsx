import React, { useState } from 'react';
import { Tree, Space, Switch } from '../../src';
import type { TreeNodeData } from '../../src';

const treeData: TreeNodeData[] = [
  {
    key: '1',
    title: '研发部',
    children: [
      {
        key: '1-1',
        title: '前端组',
        children: [
          { key: '1-1-1', title: '张三' },
          { key: '1-1-2', title: '李四' },
          { key: '1-1-3', title: '赵钱孙李周吴郑王（超长节点名称演示文本截断效果）' },
        ],
      },
      {
        key: '1-2',
        title: '后端组',
        children: [
          { key: '1-2-1', title: '王五' },
          { key: '1-2-2', title: '赵六', disabled: true },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '产品部',
    children: [
      { key: '2-1', title: '孙七' },
      { key: '2-2', title: '周八' },
    ],
  },
  {
    key: '3',
    title: '设计部',
    isLeaf: true,
  },
];

export default () => {
  const [showLine, setShowLine] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [blockNode, setBlockNode] = useState(false);
  const [defaultExpandAll, setDefaultExpandAll] = useState(false);

  return (
    <div>
      <Space style={{ marginBottom: 16 }} wrap>
        <span>连接线:</span>
        <Switch checked={showLine} onChange={() => setShowLine(!showLine)} />
        <span>图标:</span>
        <Switch checked={showIcon} onChange={() => setShowIcon(!showIcon)} />
        <span>块级节点:</span>
        <Switch checked={blockNode} onChange={() => setBlockNode(!blockNode)} />
        <span>默认全部展开:</span>
        <Switch checked={defaultExpandAll} onChange={() => setDefaultExpandAll(!defaultExpandAll)} />
      </Space>

      <Tree
        treeData={treeData}
        showLine={showLine}
        showIcon={showIcon}
        blockNode={blockNode}
        defaultExpandAll={defaultExpandAll}
        defaultExpandedKeys={defaultExpandAll ? [] : ['1', '1-1']}
        onSelect={(keys, info) => console.log('选中:', keys, info)}
        onExpand={(keys, info) => console.log('展开:', keys, info.expanded)}
      />
    </div>
  );
};
