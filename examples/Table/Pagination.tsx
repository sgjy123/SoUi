import React from 'react';
import { Table } from '../../src';

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];

const dataSource = Array.from({ length: 46 }).map((_, i) => ({
  key: String(i + 1),
  name: `用户${i + 1}`,
  age: 20 + (i % 40),
  address: `地址 ${i + 1} 号`,
}));

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    pagination={{
      pageSize: 10,
      show: true,
    }}
  />
);
