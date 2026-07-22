import React from 'react';
import { Badge, ConfigProvider, Space } from '../../src';

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
    <ConfigProvider
      theme={{
        components: {
          Badge: {
            colorError: '#722ed1',
            fontSize: 14,
          },
        },
      }}
    >
      <Badge count={5}>
        <span style={boxStyle} />
      </Badge>
    </ConfigProvider>
    <ConfigProvider
      theme={{
        components: {
          Badge: {
            colorPrimary: '#13c2c2',
          },
        },
      }}
    >
      <Badge status="processing" text="Processing" />
    </ConfigProvider>
  </Space>
);
