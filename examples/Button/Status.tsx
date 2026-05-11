import React from 'react';
import { Button, Space } from '../../src';

export default () => (
  <Space wrap>
    <Button loading type="primary">加载中</Button>
    <Button loading>加载中</Button>
    <Button disabled type="primary">禁用</Button>
    <Button disabled>禁用</Button>
    <Button danger type="primary">危险</Button>
    <Button danger>危险</Button>
  </Space>
);
