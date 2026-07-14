import React from 'react';
import { Popconfirm, Button, Space } from '../../src';

export default () => (
  <Space>
    <Popconfirm
      title="确定要删除这条数据吗？"
      onConfirm={() => console.log('confirmed')}
      onCancel={() => console.log('cancelled')}
    >
      <Button type="primary">删除</Button>
    </Popconfirm>
    <Popconfirm
      title="你确定要执行这个操作吗？"
      okText="是的"
      cancelText="不用了"
    >
      <Button>执行操作</Button>
    </Popconfirm>
    <Popconfirm
      title="确认提交？"
      disabled
    >
      <Button disabled>提交（禁用）</Button>
    </Popconfirm>
  </Space>
);
