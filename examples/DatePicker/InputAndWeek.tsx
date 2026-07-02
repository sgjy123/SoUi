import React from 'react';
import { DatePicker } from '../../src';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 100, fontSize: 14 }}>手动输入：</span>
        <DatePicker format="YYYY/MM/DD" placeholder="输入 2026/07/02" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 100, fontSize: 14 }}>默认格式：</span>
        <DatePicker picker="week" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 100, fontSize: 14 }}>中文周：</span>
        <DatePicker picker="week" format="YYYY年第ww周" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 100, fontSize: 14 }}>英文周：</span>
        <DatePicker picker="week" format="YYYY/[Week] w" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 100, fontSize: 14 }}>周在前：</span>
        <DatePicker picker="week" format="第ww周 / YYYY" />
      </div>
    </div>
  );
};
