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
    <Badge count={99}>
      <span style={boxStyle} />
    </Badge>
    <Badge count={100}>
      <span style={boxStyle} />
    </Badge>
    <Badge count={99} overflowCount={10}>
      <span style={boxStyle} />
    </Badge>
    <Badge count={1000} overflowCount={999}>
      <span style={boxStyle} />
    </Badge>
  </Space>
);
