import React from 'react';
import { Loading, Space } from '../../src';

export default () => (
  <Space direction="vertical" size={24}>
    <Space size={40}>
      <div style={{ textAlign: 'center' }}>
        <Loading size="small" />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Small</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loading />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Default</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Loading size="large" />
        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Large</div>
      </div>
    </Space>
  </Space>
);
