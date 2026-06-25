import React, { useState } from 'react';
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
  { key: '4', name: '赵六', age: 36, address: '深圳市南山区' },
  { key: '5', name: '孙七', age: 25, address: '杭州市西湖区' },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);

  const rowSelection = {
    selectedRowKeys: selectedKeys,
    onChange: (keys: (string | number)[]) => {
      setSelectedKeys(keys);
    },
  };

  return (
    <div>
      <p style={{ marginBottom: 8 }}>已选择 {selectedKeys.length} 项</p>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
      />
    </div>
  );
};
