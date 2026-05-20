import React from 'react';
import { FloatButton, Space } from '../../src';

export default () => (
  <div style={{ padding: '20px' }}>
    <h3>不同位置的悬浮按钮</h3>
    <Space direction="vertical" size="large">
      <p>右上角：</p>
      <FloatButton 
        icon="Plus" 
        position={{ bottom: 200, right: 24 }}
        tooltip="右上角"
      />
      
      <p>右下角（默认）：</p>
      <FloatButton 
        icon="Plus" 
        tooltip="右下角"
      />
      
      <p>自定义 bottom：</p>
      <FloatButton 
        icon="Plus" 
        position={{ bottom: 100 }}
        tooltip="bottom: 100px"
      />
      
      <p>自定义 right：</p>
      <FloatButton 
        icon="Plus" 
        position={{ right: 100 }}
        tooltip="right: 100px"
      />
    </Space>
  </div>
);
