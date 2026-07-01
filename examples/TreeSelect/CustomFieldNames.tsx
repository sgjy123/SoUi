import React from 'react';
import { TreeSelect } from '../../src';
import type { TreeSelectOption } from '../../src';

const backendData: TreeSelectOption[] = [
  {
    id: 1,
    value: 1,
    name: '研发部',
    subItems: [
      {
        id: 11,
        value: 11,
        name: '前端组',
        subItems: [
          { id: 111, value: 111, name: 'React 小组' },
          { id: 112, value: 112, name: 'Vue 小组' },
        ],
      },
      {
        id: 12,
        value: 12,
        name: '后端组',
        subItems: [
          { id: 121, value: 121, name: 'Java 小组' },
          { id: 122, value: 122, name: 'Go 小组' },
        ],
      },
    ],
  },
  {
    id: 2,
    value: 2,
    name: '产品部',
    subItems: [
      { id: 21, value: 21, name: '产品一组' },
      { id: 22, value: 22, name: '产品二组' },
    ],
  },
];

export default function CustomFieldNamesDemo() {
  return (
    <div style={{ maxWidth: 400 }}>
      <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义字段名映射后端数据结构</p>
      <TreeSelect
        treeData={backendData}
        fieldNames={{ label: 'name', value: 'id', children: 'subItems' }}
        defaultValue={111}
        placeholder="请选择部门"
      />
    </div>
  );
}

