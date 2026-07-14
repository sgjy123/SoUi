import React, { useState } from 'react';
import { Table, Button, Space, Checkbox } from '../../src';

interface ColumnItem {
  title: string;
  dataIndex: string;
  key: string;
  visible: boolean;
}

const allColumns: ColumnItem[] = [
  { title: '姓名', dataIndex: 'name', key: 'name', visible: true },
  { title: '年龄', dataIndex: 'age', key: 'age', visible: true },
  { title: '性别', dataIndex: 'gender', key: 'gender', visible: true },
  { title: '城市', dataIndex: 'city', key: 'city', visible: true },
  { title: '职业', dataIndex: 'job', key: 'job', visible: false },
  { title: '邮箱', dataIndex: 'email', key: 'email', visible: false },
  { title: '电话', dataIndex: 'phone', key: 'phone', visible: false },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, gender: '男', city: '北京', job: '工程师', email: 'zhang@example.com', phone: '138****1234' },
  { key: '2', name: '李四', age: 28, gender: '女', city: '上海', job: '设计师', email: 'li@example.com', phone: '139****5678' },
  { key: '3', name: '王五', age: 25, gender: '男', city: '广州', job: '产品经理', email: 'wang@example.com', phone: '137****9012' },
  { key: '4', name: '赵六', age: 36, gender: '女', city: '深圳', job: '运营', email: 'zhao@example.com', phone: '136****3456' },
];

export default () => {
  const [columnConfig, setColumnConfig] = useState(allColumns);

  const visibleColumns = columnConfig.filter(c => c.visible);

  const toggleColumn = (key: string) => {
    setColumnConfig(prev =>
      prev.map(c => c.key === key ? { ...c, visible: !c.visible } : c)
    );
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <span style={{ marginRight: 8, fontWeight: 600 }}>显示列：</span>
        <Space wrap>
          {columnConfig.map(col => (
            <Checkbox
              key={col.key}
              checked={col.visible}
              onChange={() => toggleColumn(col.key)}
            >
              {col.title}
            </Checkbox>
          ))}
        </Space>
      </div>
      <Table columns={visibleColumns} dataSource={dataSource} bordered />
    </div>
  );
};
