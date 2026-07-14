import React from 'react';
import { Table } from '../../src';

const dataSource = [
  { key: '1', name: '张三', age: 32, city: '北京', district: '朝阳区', phone: '138****1234', email: 'zhangsan@example.com' },
  { key: '2', name: '张三', age: 32, city: '北京', district: '海淀区', phone: '138****5678', email: 'zhangsan2@example.com' },
  { key: '3', name: '李四', age: 28, city: '上海', district: '浦东新区', phone: '139****9012', email: 'lisi@example.com' },
  { key: '4', name: '李四', age: 28, city: '上海', district: '黄浦区', phone: '139****3456', email: 'lisi2@example.com' },
  { key: '5', name: '王五', age: 35, city: '广州', district: '天河区', phone: '137****7890', email: 'wangwu@example.com' },
];

// 计算相邻相同值的行合并数
const getRowSpan = (data: any[], field: string, index: number): number => {
  const current = data[index][field];
  if (index > 0 && data[index - 1][field] === current) return 0;
  let count = 1;
  for (let i = index + 1; i < data.length; i++) {
    if (data[i][field] === current) count++;
    else break;
  }
  return count;
};

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    onCell: (_: any, index: number) => ({
      rowSpan: getRowSpan(dataSource, 'name', index),
    }),
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    onCell: (_: any, index: number) => ({
      rowSpan: getRowSpan(dataSource, 'age', index),
    }),
  },
  {
    title: '城市',
    dataIndex: 'city',
    key: 'city',
    onCell: (_: any, index: number) => ({
      rowSpan: getRowSpan(dataSource, 'city', index),
    }),
  },
  { title: '区域', dataIndex: 'district', key: 'district' },
  {
    title: '联系方式',
    key: 'contact',
    colSpan: 2,
    render: (_: any, record: any) => `${record.phone} / ${record.email}`,
  },
  {
    dataIndex: 'email',
    key: 'email',
    colSpan: 0,
    onHeaderCell: () => ({ colSpan: 0 }),
  },
];

export default () => (
  <Table columns={columns} dataSource={dataSource} bordered />
);
