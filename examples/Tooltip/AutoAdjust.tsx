import React from 'react';
import { Tooltip, Button } from '../../src';

export default () => (
  <div style={{ height: '50px', overflow: 'hidden' }}>
    <Tooltip title="自动调整位置" autoAdjustOverflow>
      <Button>溢出测试</Button>
    </Tooltip>
  </div>
);
