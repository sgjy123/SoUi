import React from 'react';
import { Table } from '../../src';

const dataSource = [
  { key: '1', name: '张三', age: 32, city: '北京', district: '朝阳区', phone: '138****1234' },
  { key: '2', name: '张三', age: 32, city: '北京', district: '海淀区', phone: '138****5678' },
  { key: '3', name: '李四', age: 28, city: '上海', district: '浦东新区', phone: '139****9012' },
  { key: '4', name: '李四', age: 28, city: '上海', district: '黄浦区', phone: '139****3456' },
  { key: '5', name: '王五', age: 35, city: '广州', district: '天河区', phone: '137****7890' },
];

// 计算相同 name 的行合并
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
  { title: '电话', dataIndex: 'phone', key: 'phone' },
  {
    title: '联系方式（合并列）',
    dataIndex: 'phone',
    key: 'contact',
    colSpan: 2,
    onCell: (_: any, index: number) => {
      // 偶数行跨两列
      if (index % 2 === 0) return { colSpan: 2 };
      return { colSpan: 0 }; // 隐藏下一列
    },
  },
];

export default () => (
  <Table columns={columns} dataSource={dataSource} bordered />
);
