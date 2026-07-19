import React, { useState } from 'react';
import { Tree, Space, Switch } from '../../src';
import type { TreeNodeData } from '../../src';

const treeData: TreeNodeData[] = [
  {
    key: '1',
    title: '这是一个非常长的部门名称用于演示文本截断效果和 Tooltip 提示功能',
    children: [
      {
        key: '1-1',
        title: '前端开发团队 - 负责所有前端相关的技术栈和项目开发工作',
        children: [
          { key: '1-1-1', title: '张三（React 高级工程师，5年经验）' },
          { key: '1-1-2', title: '李四（Vue 高级工程师，3年经验）' },
          { key: '1-1-3', title: '短名称' },
        ],
      },
      {
        key: '1-2',
        title: '后端开发团队',
        children: [
          { key: '1-2-1', title: '王五（Java 架构师）' },
          { key: '1-2-2', title: '赵六（Go 高级工程师，负责微服务架构设计与实现）' },
        ],
      },
    ],
  },
  {
    key: '2',
    title: '产品部',
    children: [
      { key: '2-1', title: '孙七（产品经理，负责B端产品线规划与需求管理）' },
      { key: '2-2', title: '周八' },
    ],
  },
  {
    key: '3',
    title: '设计部（UI/UX 设计团队，包含视觉设计、交互设计、用户研究）',
    isLeaf: true,
  },
];

export default () => {
  const [tooltip, setTooltip] = useState(true);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <span>启用 Tooltip:</span>
        <Switch checked={tooltip} onChange={() => setTooltip(!tooltip)} />
        <span style={{ color: '#999', fontSize: 12 }}>
          （关闭后仍可通过浏览器原生 title 属性查看完整标题）
        </span>
      </Space>

      <div style={{ maxWidth: 400, border: '1px solid #f0f0f0', borderRadius: 6, padding: 12 }}>
        <Tree
          treeData={treeData}
          tooltip={tooltip}
          defaultExpandedKeys={['1', '1-1']}
          onSelect={(keys) => console.log('选中:', keys)}
        />
      </div>
    </div>
  );
};
