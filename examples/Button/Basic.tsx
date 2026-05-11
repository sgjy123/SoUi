import React from 'react';
import { Button, Space } from '../../src';

export default () => (
  <Space wrap>
    <Button type="primary">主要按钮</Button>
    <Button>默认按钮</Button>
    <Button type="dashed">虚线按钮</Button>
    <Button type="text">文本按钮</Button>
    <Button type="link">链接按钮</Button>
  </Space>
);
