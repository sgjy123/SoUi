import React from 'react';
import { Table } from '../../src';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    multiple: 2,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: (a: any, b: any) => a.age - b.age,
    multiple: 1,
  },
  {
    title: '分数',
    dataIndex: 'score',
    key: 'score',
    sorter: (a: any, b: any) => a.score - b.score,
    multiple: 3,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, score: 88, address: '北京市朝阳区' },
  { key: '2', name: '李四', age: 42, score: 92, address: '上海市浦东新区' },
  { key: '3', name: '王五', age: 28, score: 88, address: '广州市天河区' },
  { key: '4', name: '赵六', age: 36, score: 95, address: '深圳市南山区' },
  { key: '5', name: '孙七', age: 25, score: 76, address: '杭州市西湖区' },
  { key: '6', name: '周八', age: 32, score: 88, address: '成都市武侯区' },
];

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    onChange={(_pagination, sorter) => {
      console.log('排序变化:', sorter);
    }}
  />
);
