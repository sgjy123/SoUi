import React from 'react';
import { Card, Space } from '../../src';

export default () => (
  <Space size={16} align="start">
    <Card title="默认尺寸" extra={<a href="#" onClick={(e) => e.preventDefault()}>更多</a>} style={{ width: 280 }}>
      <p>卡片内容</p>
    </Card>
    <Card title="小尺寸" size="small" extra={<a href="#" onClick={(e) => e.preventDefault()}>更多</a>} style={{ width: 280 }}>
      <p>卡片内容</p>
    </Card>
  </Space>
);
