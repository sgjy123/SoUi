import React from 'react';
import { Table } from '../../src';

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '北京市朝阳区' },
  { key: '2', name: '李四', age: 42, address: '上海市浦东新区' },
  { key: '3', name: '王五', age: 28, address: '广州市天河区' },
];

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <div>
      <h4 style={{ marginBottom: 8 }}>小尺寸</h4>
      <Table columns={columns} dataSource={dataSource} size="small" bordered />
    </div>
    <div>
      <h4 style={{ marginBottom: 8 }}>默认尺寸</h4>
      <Table columns={columns} dataSource={dataSource} size="middle" bordered />
    </div>
    <div>
      <h4 style={{ marginBottom: 8 }}>大尺寸</h4>
      <Table columns={columns} dataSource={dataSource} size="large" bordered />
    </div>
  </div>
);
