import React from 'react';
import { Table } from '../../src';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: any, b: any) => a.name.localeCompare(b.name),
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    sorter: (a: any, b: any) => a.age - b.age,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    filters: [
      { text: '男', value: 'male' },
      { text: '女', value: 'female' },
    ],
    onFilter: (value: any, record: any) => record.gender === value,
  },
  {
    title: '部门',
    dataIndex: 'department',
    key: 'department',
    filters: [
      { text: '技术部', value: 'tech' },
      { text: '产品部', value: 'product' },
      { text: '设计部', value: 'design' },
      { text: '市场部', value: 'marketing' },
    ],
    onFilter: (value: any, record: any) => record.department === value,
    filterSearch: true,
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, gender: 'male', department: 'tech', address: '北京市朝阳区' },
  { key: '2', name: '李四', age: 42, gender: 'female', department: 'product', address: '上海市浦东新区' },
  { key: '3', name: '王五', age: 28, gender: 'male', department: 'design', address: '广州市天河区' },
  { key: '4', name: '赵六', age: 36, gender: 'female', department: 'marketing', address: '深圳市南山区' },
  { key: '5', name: '孙七', age: 25, gender: 'male', department: 'tech', address: '杭州市西湖区' },
  { key: '6', name: '周八', age: 30, gender: 'female', department: 'tech', address: '成都市武侯区' },
];

export default () => (
  <Table columns={columns} dataSource={dataSource} />
);
