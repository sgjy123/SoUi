import React from 'react';
import { Card, Space } from '../../src';

export default () => (
  <Space size={16} align="start">
    <Card title="有边框" style={{ width: 260 }}>
      <p>默认带边框的卡片。</p>
    </Card>
    <Card title="无边框" bordered={false} style={{ width: 260, background: '#f5f5f5' }}>
      <p>bordered=false 去除边框。</p>
    </Card>
    <Card title="悬停浮起" hoverable style={{ width: 260 }}>
      <p>鼠标移入时浮起阴影。</p>
    </Card>
  </Space>
);
