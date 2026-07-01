import React from 'react';
import { Rate } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ minWidth: 60, fontSize: 14 }}>默认：</span>
      <Rate defaultValue={3} />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ minWidth: 60, fontSize: 14 }}>禁用：</span>
      <Rate defaultValue={3} disabled />
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ minWidth: 60, fontSize: 14 }}>只读：</span>
      <Rate defaultValue={4} allowHalf disabled />
    </div>
  </div>
);
