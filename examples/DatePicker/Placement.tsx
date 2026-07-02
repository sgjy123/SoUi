import React from 'react';
import { DatePicker } from '../../src';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 100, fontSize: 14 }}>左下弹出：</span>
        <DatePicker placement="bottomLeft" placeholder="bottomLeft" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 100, fontSize: 14 }}>右下弹出：</span>
        <DatePicker placement="bottomRight" placeholder="bottomRight" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 100, fontSize: 14 }}>左上弹出：</span>
        <DatePicker placement="topLeft" placeholder="topLeft" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 100, fontSize: 14 }}>右上弹出：</span>
        <DatePicker placement="topRight" placeholder="topRight" />
      </div>
    </div>
  );
};
