import React from 'react';
import { Space, Button } from '../../src';

export default () => (
  <Space align="center" style={{ height: '100px', background: '#f5f5f5' }}>
    <Button type="primary">居中对齐</Button>
    <div style={{ height: '50px', background: '#ccc' }}>高盒子</div>
  </Space>
);
