import React, { useState } from 'react';
import { Table, Button, Space } from '../../src';

const StatusBadge = ({ active, children }: { active: boolean; children: React.ReactNode }) => (
  <span style={{
    display: 'inline-block', padding: '2px 8px', fontSize: 12,
    borderRadius: 4,
    background: active ? '#f6ffed' : '#fff2f0',
    color: active ? '#52c41a' : '#ff4d4f',
    border: `1px solid ${active ? '#b7eb8f' : '#ffccc7'}`,
  }}>
    {children}
  </span>
);

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '部门', dataIndex: 'department', key: 'department' },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (s: string) => <StatusBadge active={s === '在职'}>{s}</StatusBadge>,
  },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, department: '技术部', status: '在职' },
  { key: '2', name: '李四', age: 42, department: '产品部', status: '在职' },
  { key: '3', name: '王五', age: 28, department: '设计部', status: '离职' },
  { key: '4', name: '赵六', age: 36, department: '市场部', status: '在职' },
  { key: '5', name: '孙七', age: 25, department: '技术部', status: '离职' },
  { key: '6', name: '周八', age: 30, department: '产品部', status: '在职' },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState<(string | number)[]>([]);
  const [data, setData] = useState(dataSource);

  const rowSelection = {
    selectedRowKeys: selectedKeys,
    onChange: (keys: (string | number)[]) => setSelectedKeys(keys),
    getCheckboxProps: (record: any) => ({
      disabled: record.status === '离职',
    }),
  };

  const handleBatchDelete = () => {
    setData(prev => prev.filter(item => !selectedKeys.includes(item.key)));
    setSelectedKeys([]);
  };

  const handleBatchExport = () => {
    const selectedRows = data.filter(item => selectedKeys.includes(item.key));
    alert(`导出 ${selectedRows.length} 条数据: ${selectedRows.map(r => r.name).join(', ')}`);
  };

  return (
    <div>
      {selectedKeys.length > 0 && (
        <Space style={{ marginBottom: 16, padding: '8px 16px', background: '#e6f4ff', borderRadius: 6 }}>
          <span>已选择 <strong>{selectedKeys.length}</strong> 项</span>
          <Button size="small" type="primary" onClick={handleBatchExport}>批量导出</Button>
          <Button size="small" danger onClick={handleBatchDelete}>批量删除</Button>
          <Button size="small" onClick={() => setSelectedKeys([])}>取消选择</Button>
        </Space>
      )}
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        bordered
      />
    </div>
  );
};
