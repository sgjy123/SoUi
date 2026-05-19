import React from 'react';
import { FloatButton, Space } from '../../src';

export default () => (
  <div style={{ padding: '20px' }}>
    <h3>不同位置的悬浮按钮</h3>
    <Space direction="vertical" size="large">
      <p>左上角：</p>
      <FloatButton 
        icon="Plus" 
        position={{ top: 24, left: 24 }}
        tooltip="左上角"
      />
      
      <p>右上角：</p>
      <FloatButton 
        icon="Plus" 
        position={{ top: 24, right: 24 }}
        tooltip="右上角"
      />
      
      <p>左下角：</p>
      <FloatButton 
        icon="Plus" 
        position={{ bottom: 24, left: 24 }}
        tooltip="左下角"
      />
      
      <p>右下角（默认）：</p>
      <FloatButton 
        icon="Plus" 
        tooltip="右下角"
      />
    </Space>
  </div>
);
