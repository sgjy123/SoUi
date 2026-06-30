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
];

export default () => {
  const [value, setValue] = useState<(string | number)[]>(['zhangsan']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TreeSelect
        treeData={treeData}
        value={value}
        onChange={(val) => setValue(val)}
        placeholder="请选择成员（多选）"
        multiple
        style={{ width: 400 }}
        treeDefaultExpandAll
        allowClear
      />
      <TreeSelect
        treeData={treeData}
        defaultValue={['lisi', 'sunqi']}
        placeholder="多选带默认值"
        multiple
        style={{ width: 400 }}
        treeDefaultExpandAll
        allowClear
        maxTagCount={2}
      />
    </div>
  );
};
