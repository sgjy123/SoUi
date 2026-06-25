import React, { useState } from 'react';
import { Table, Button, Space } from '../../src';

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

export default () => {
  const [loading, setLoading] = useState(false);

  const handleFetchData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={handleFetchData} type="primary">
          加载数据
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        emptyText="暂无数据"
      />
    </div>
  );
};
