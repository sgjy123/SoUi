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
  const [value1, setValue1] = useState<(string | number)[]>([]);
  const [value2, setValue2] = useState<(string | number)[]>([]);
  const [value3, setValue3] = useState<(string | number)[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ marginBottom: 8, color: 'rgba(0,0,0,0.65)' }}>SHOW_ALL - 显示所有选中节点</div>
        <TreeSelect
          treeData={treeData}
          value={value1}
          onChange={(val) => setValue1(Array.isArray(val) ? val : [val])}
          placeholder="可勾选（SHOW_ALL）"
          treeCheckable
          multiple
          showCheckedStrategy="SHOW_ALL"
          style={{ width: 400 }}
          treeDefaultExpandAll
          allowClear
        />
        <div style={{ marginTop: 4, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
          选中值: {JSON.stringify(value1)}
        </div>
      </div>

      <div>
        <div style={{ marginBottom: 8, color: 'rgba(0,0,0,0.65)' }}>SHOW_PARENT - 只显示父节点</div>
        <TreeSelect
          treeData={treeData}
          value={value2}
          onChange={(val) => setValue2(Array.isArray(val) ? val : [val])}
          placeholder="可勾选（SHOW_PARENT）"
          treeCheckable
          multiple
          showCheckedStrategy="SHOW_PARENT"
          style={{ width: 400 }}
          treeDefaultExpandAll
          allowClear
        />
        <div style={{ marginTop: 4, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
          选中值: {JSON.stringify(value2)}
        </div>
      </div>

      <div>
        <div style={{ marginBottom: 8, color: 'rgba(0,0,0,0.65)' }}>SHOW_CHILD - 只显示叶子节点</div>
        <TreeSelect
          treeData={treeData}
          value={value3}
          onChange={(val) => setValue3(Array.isArray(val) ? val : [val])}
          placeholder="可勾选（SHOW_CHILD）"
          treeCheckable
          multiple
          showCheckedStrategy="SHOW_CHILD"
          style={{ width: 400 }}
          treeDefaultExpandAll
          allowClear
        />
        <div style={{ marginTop: 4, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
          选中值: {JSON.stringify(value3)}
        </div>
      </div>
    </div>
  );
};
