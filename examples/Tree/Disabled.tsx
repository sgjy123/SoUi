import React from 'react';
import { Tree, Space, Switch } from '../../src';
import type { TreeNodeData } from '../../src';

const treeData: TreeNodeData[] = [
  {
    key: '1',
    title: '可用部门',
    children: [
      {
        key: '1-1',
        title: '前端组',
        children: [
          { key: '1-1-1', title: '张三' },
          { key: '1-1-2', title: '李四（不可选）', disabled: true },
          { key: '1-1-3', title: '王五（不可勾选）', disableCheckbox: true },
        ],
      },
      {
        key: '1-2',
        title: '后端组',
        disabled: true,
        children: [
          { key: '1-2-1', title: '赵六' },
          { key: '1-2-2', title: '钱七' },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '产品部（整棵禁用）',
    disabled: true,
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
  const [treeDisabled, setTreeDisabled] = React.useState(false);
  const [checkedKeys, setCheckedKeys] = React.useState<React.Key[]>(['1-1-1']);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <span>整棵树禁用:</span>
        <Switch checked={treeDisabled} onChange={() => setTreeDisabled(!treeDisabled)} />
      </Space>

      <div style={{ marginBottom: 12, color: '#666', fontSize: 13 }}>
        disabled 节点不可选、不可勾选、样式置灰。disableCheckbox 仅禁用复选框，节点仍可选中。
      </div>

      <Tree
        checkable
        treeData={treeData}
        disabled={treeDisabled}
        checkedKeys={checkedKeys}
        onCheck={(keys) => setCheckedKeys(keys)}
        defaultExpandedKeys={['1', '1-1', '1-2', '2']}
        onSelect={(keys) => console.log('选中:', keys)}
      />
    </div>
  );
};
