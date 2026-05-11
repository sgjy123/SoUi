import React from 'react';
import { Space, Button } from '../../src';

export default () => (
  <Space split={<span style={{ color: '#d9d9d9' }}>|</span>}>
    <Button type="text">链接1</Button>
    <Button type="text">链接2</Button>
    <Button type="text">链接3</Button>
  </Space>
);
