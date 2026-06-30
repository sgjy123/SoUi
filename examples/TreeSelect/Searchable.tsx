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
        onChange={(val) => setValue(val)}
        placeholder="搜索选择（输入关键词过滤）"
        showSearch
        treeNodeFilterProp="title"
        style={{ width: 300 }}
        treeDefaultExpandAll
        allowClear
      />
      <TreeSelect
        treeData={treeData}
        placeholder="搜索多选"
        multiple
        showSearch
        treeNodeFilterProp="title"
        style={{ width: 400 }}
        treeDefaultExpandAll
        allowClear
      />
      <TreeSelect
        treeData={treeData}
        placeholder="错误状态"
        status="error"
        style={{ width: 300 }}
        treeDefaultExpandAll
      />
      <TreeSelect
        treeData={treeData}
        placeholder="警告状态"
        status="warning"
        style={{ width: 300 }}
        treeDefaultExpandAll
      />
    </div>
  );
};
