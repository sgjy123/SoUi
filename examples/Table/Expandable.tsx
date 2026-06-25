import React from 'react';
import { Table } from '../../src';

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '北京市朝阳区', description: '软件工程师，5年经验' },
  { key: '2', name: '李四', age: 42, address: '上海市浦东新区', description: '产品经理，10年经验' },
  { key: '3', name: '王五', age: 28, address: '广州市天河区', description: '前端开发，3年经验' },
];

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    expandable={{
      expandedRowRender: (record: any) => (
        <p style={{ margin: 0 }}>
          <strong>详细信息：</strong>{record.description}
        </p>
      ),
    }}
  />
);
