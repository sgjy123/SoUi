import React from 'react';
import { Table, Progress, Button, Space } from '../../src';

const StatusBadge = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <span style={{
    display: 'inline-block', padding: '2px 8px', fontSize: 12,
    borderRadius: 4, background: color === 'green' ? '#f6ffed' : color === 'red' ? '#fff2f0' : '#fff7e6',
    color: color === 'green' ? '#52c41a' : color === 'red' ? '#ff4d4f' : '#faad14',
    border: `1px solid ${color === 'green' ? '#b7eb8f' : color === 'red' ? '#ffccc7' : '#ffd591'}`,
  }}>
    {children}
  </span>
);

const RoleBadge = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    display: 'inline-block', padding: '2px 8px', fontSize: 12,
    borderRadius: 4, background: '#f0f5ff', color: '#2f54eb',
    border: '1px solid #adc6ff',
  }}>
    {children}
  </span>
);

const columns = [
  {
    title: '用户',
    dataIndex: 'name',
    key: 'name',
    render: (_: any, record: any) => (
      <Space>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: record.avatar, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontSize: 14, fontWeight: 600,
        }}>
          {record.name[0]}
        </div>
        <span>{record.name}</span>
      </Space>
    ),
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => (
      <StatusBadge color={status === 'active' ? 'green' : status === 'inactive' ? 'red' : 'orange'}>
        {status === 'active' ? '活跃' : status === 'inactive' ? '停用' : '待审'}
      </StatusBadge>
    ),
  },
  {
    title: '完成度',
    dataIndex: 'progress',
    key: 'progress',
    render: (val: number) => <Progress percent={val} size="small" />,
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
    render: (role: string) => <RoleBadge>{role}</RoleBadge>,
  },
  {
    title: '操作',
    key: 'action',
    render: (_: any, record: any) => (
      <Space>
        <Button type="link" size="small">编辑</Button>
        <Button type="link" size="small" danger>删除</Button>
      </Space>
    ),
  },
];

const dataSource = [
  { key: '1', name: '张三', status: 'active', progress: 85, role: '管理员', avatar: '#1677ff' },
  { key: '2', name: '李四', status: 'pending', progress: 42, role: '编辑', avatar: '#52c41a' },
  { key: '3', name: '王五', status: 'inactive', progress: 100, role: '访客', avatar: '#faad14' },
  { key: '4', name: '赵六', status: 'active', progress: 67, role: '编辑', avatar: '#722ed1' },
  { key: '5', name: '孙七', status: 'pending', progress: 23, role: '访客', avatar: '#eb2f96' },
];

export default () => (
  <Table columns={columns} dataSource={dataSource} />
);
