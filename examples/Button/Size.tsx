import React from 'react';
import { Button, Space } from '../../src';

export default () => (
  <Space direction="vertical">
    <Space>
      <Button size="large" type="primary">大按钮</Button>
      <Button size="large">大按钮</Button>
      <Button size="large" type="dashed">大按钮</Button>
    </Space>
    <Space>
      <Button type="primary">中等按钮</Button>
      <Button>中等按钮</Button>
      <Button type="dashed">中等按钮</Button>
    </Space>
    <Space>
      <Button size="small" type="primary">小按钮</Button>
      <Button size="small">小按钮</Button>
      <Button size="small" type="dashed">小按钮</Button>
    </Space>
  </Space>
);
