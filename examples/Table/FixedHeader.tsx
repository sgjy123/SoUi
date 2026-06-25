import React from 'react';
import { Table } from '../../src';

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', key: 'age', width: 100 },
  { title: '地址', dataIndex: 'address', key: 'address' },
  { title: '电话', dataIndex: 'phone', key: 'phone', width: 150 },
  { title: '邮箱', dataIndex: 'email', key: 'email', width: 200 },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '北京市朝阳区建国路88号', phone: '138****1234', email: 'zhangsan@example.com' },
  { key: '2', name: '李四', age: 42, address: '上海市浦东新区世纪大道100号', phone: '139****5678', email: 'lisi@example.com' },
  { key: '3', name: '王五', age: 28, address: '广州市天河区珠江新城', phone: '137****9012', email: 'wangwu@example.com' },
  { key: '4', name: '赵六', age: 36, address: '深圳市南山区科技园', phone: '136****3456', email: 'zhaoliu@example.com' },
  { key: '5', name: '孙七', age: 25, address: '杭州市西湖区文三路', phone: '135****7890', email: 'sunqi@example.com' },
];

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    scroll={{ x: 800 }}
    bordered
  />
);
