import React, { useState } from 'react';
import { TreeSelect } from '../../src';

const treeData = [
  {
    title: '技术部',
    value: 'tech',
    children: [
      {
        title: '前端组',
        value: 'frontend',
        children: [
          { title: '张三', value: 'zhangsan' },
          { title: '李四', value: 'lisi' },
          { title: '王五', value: 'wangwu' },
        ],
      },
      {
        title: '后端组',
        value: 'backend',
        children: [
          { title: '赵六', value: 'zhaoliu' },
          { title: '孙七', value: 'sunqi' },
        ],
      },
    ],
  },
  {
    title: '产品部',
    value: 'product',
    children: [
      { title: '周八', value: 'zhouba' },
      { title: '吴九', value: 'wujiu' },
    ],
  },
  {
    title: '设计部',
    value: 'design',
    disabled: true,
    children: [
      { title: '郑十', value: 'zhengshi' },
    ],
  },
];

export default () => {
  const [value, setValue] = useState<string | number>();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TreeSelect
        treeData={treeData}
        value={value}
        onChange={(val) => {
          console.log('TreeSelect onChange:', val);
          setValue(val)
        }}
        placeholder="请选择部门成员"
        style={{ width: 300 }}
        treeDefaultExpandAll
      />
      <TreeSelect
        treeData={treeData}
        defaultValue="lisi"
        placeholder="默认选中李四"
        style={{ width: 300 }}
        treeDefaultExpandAll
      />
      <TreeSelect
        treeData={treeData}
        placeholder="禁用状态"
        disabled
        style={{ width: 300 }}
      />
    </div>
  );
};
