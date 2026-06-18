import React from 'react';
import { Alert, Space } from '../../src';

export default () => (
  <Space direction="vertical" size={12} style={{ width: '100%' }}>
    <Alert message="Info Text" description="Additional description and information." type="info" showIcon />
    <Alert message="Success Text" description="Additional description and information." type="success" showIcon />
    <Alert message="Warning Text" description="Additional description and information." type="warning" showIcon />
    <Alert message="Error Text" description="Additional description and information." type="error" showIcon />
  </Space>
);
