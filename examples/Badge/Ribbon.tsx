import React from 'react';
import { Badge, Card, Space } from '../../src';

export default () => (
  <Space size={24} align="start">
    <Badge.Ribbon text="热门">
      <Card title="默认缎带" style={{ width: 220 }}>
        <p>缎带位于右上角。</p>
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="推荐" color="green">
      <Card title="自定义颜色" style={{ width: 220 }}>
        <p>绿色缎带。</p>
      </Card>
    </Badge.Ribbon>
    <Badge.Ribbon text="左侧" color="purple" placement="start">
      <Card title="左侧缎带" style={{ width: 220 }}>
        <p>缎带位于左上角。</p>
      </Card>
    </Badge.Ribbon>
  </Space>
);
