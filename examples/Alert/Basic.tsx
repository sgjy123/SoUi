import React from 'react';
import { Alert, Space } from '../../src';

export default () => (
  <Space direction="vertical" size={12} style={{ width: '100%' }}>
    <Alert message="Info Text" type="info" />
    <Alert message="Success Text" type="success" />
    <Alert message="Warning Text" type="warning" />
    <Alert message="Error Text" type="error" />
  </Space>
);
