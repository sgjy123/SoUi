import React, { useState } from 'react';
import { Table, Button, Space, Empty } from '../../src';

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '性别', dataIndex: 'gender', key: 'gender' },
  { title: '城市', dataIndex: 'city', key: 'city' },
];

const fullData = [
  { key: '1', name: '张三', age: 32, gender: '男', city: '北京' },
  { key: '2', name: '李四', age: 28, gender: '女', city: '上海' },
  { key: '3', name: '王五', age: 25, gender: '男', city: '广州' },
  { key: '4', name: '赵六', age: 36, gender: '女', city: '深圳' },
  { key: '5', name: '孙七', age: 30, gender: '男', city: '杭州' },
  { key: '6', name: '周八', age: 27, gender: '女', city: '成都' },
];

export default () => {
  const [data, setData] = useState(fullData);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => setData(fullData)} type="primary">加载数据</Button>
        <Button onClick={() => setData([])} danger>清空数据</Button>
      </Space>

      <h4 style={{ marginBottom: 8 }}>斑马纹表格</h4>
      <Table
        columns={columns}
        dataSource={data}
        striped
        bordered
        emptyText={
          <Empty
            description="暂无数据，请点击加载数据按钮"
            image="empty"
          />
        }
      />
    </div>
  );
};
