import React from 'react';
import { Space, Button } from '../../src';

export default () => (
  <Space block>
    <Button type="primary">块级元素</Button>
    <Button>占据整行</Button>
  </Space>
);
