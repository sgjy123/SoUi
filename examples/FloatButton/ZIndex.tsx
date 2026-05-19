import React from 'react';
import { FloatButton, Space } from '../../src';

export default () => (
  <div style={{ padding: '20px' }}>
    <h3>不同 z-index 层级的悬浮按钮</h3>
    <Space direction="vertical" size="large">
      <p>默认层级（zIndex: 999）：</p>
      <FloatButton 
        icon="Plus" 
        position={{ top: 24, right: 24 }}
        tooltip="默认层级"
      />
      
      <p>高层级（zIndex: 9999）：</p>
      <FloatButton 
        icon="Star" 
        type="primary"
        position={{ top: 100, right: 24 }}
        zIndex={9999}
        tooltip="高层级"
      />
      
      <p>低层级（zIndex: 100）：</p>
      <FloatButton 
        icon="Setting" 
        position={{ top: 176, right: 24 }}
        zIndex={100}
        tooltip="低层级"
      />
    </Space>
  </div>
);
