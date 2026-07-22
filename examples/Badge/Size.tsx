import React from 'react';
import { Badge, Space } from '../../src';

const boxStyle: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: 8,
  background: '#f0f0f0',
  display: 'inline-block',
};

export default () => (
  <Space size={32}>
    <Badge count={5}>
      <span style={boxStyle} />
    </Badge>
    <Badge count={5} size="small">
      <span style={boxStyle} />
    </Badge>
    <Badge count={5} bordered>
      <span style={boxStyle} />
    </Badge>
  </Space>
);
