import React from 'react';
import { Table, Button, Space } from '../../src';

const GradeBadge = ({ grade }: { grade: string }) => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    A: { bg: '#f6ffed', text: '#52c41a', border: '#b7eb8f' },
    B: { bg: '#e6f4ff', text: '#1677ff', border: '#91caff' },
    C: { bg: '#fff7e6', text: '#faad14', border: '#ffd591' },
  };
  const c = colors[grade] || colors.B;
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', fontSize: 12,
      borderRadius: 4, background: c.bg, color: c.text, border: `1px solid ${c.border}`,
    }}>
      {grade}
    </span>
  );
};

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name', width: 120, fixed: 'left' as const },
  { title: '年龄', dataIndex: 'age', key: 'age', width: 80 },
  { title: '部门', dataIndex: 'department', key: 'department', width: 120 },
  { title: '职位', dataIndex: 'position', key: 'position', width: 150 },
  { title: '入职日期', dataIndex: 'hireDate', key: 'hireDate', width: 130 },
  { title: '薪资', dataIndex: 'salary', key: 'salary', width: 120, render: (v: number) => `¥${v.toLocaleString()}` },
  { title: '绩效', dataIndex: 'performance', key: 'performance', width: 100,
    render: (v: string) => <GradeBadge grade={v} />,
  },
  {
    title: '操作',
    key: 'action',
    width: 150,
    fixed: 'right' as const,
    render: () => (
      <Space>
        <Button type="link" size="small">查看</Button>
        <Button type="link" size="small">编辑</Button>
      </Space>
    ),
  },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, department: '技术部', position: '高级工程师', hireDate: '2020-03-15', salary: 25000, performance: 'A' },
  { key: '2', name: '李四', age: 28, department: '产品部', position: '产品经理', hireDate: '2021-07-20', salary: 22000, performance: 'B' },
  { key: '3', name: '王五', age: 35, department: '设计部', position: '设计主管', hireDate: '2019-01-10', salary: 28000, performance: 'A' },
  { key: '4', name: '赵六', age: 26, department: '市场部', position: '市场专员', hireDate: '2022-09-01', salary: 15000, performance: 'C' },
  { key: '5', name: '孙七', age: 30, department: '技术部', position: '前端开发', hireDate: '2021-03-05', salary: 20000, performance: 'B' },
  { key: '6', name: '周八', age: 33, department: '技术部', position: '后端开发', hireDate: '2018-11-22', salary: 27000, performance: 'A' },
];

export default () => (
  <Table columns={columns} dataSource={dataSource} scroll={{ x: 1100 }} bordered />
);
