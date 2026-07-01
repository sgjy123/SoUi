import React, { useState } from 'react';
import { DatePicker } from '../../src';

export default () => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 80, fontSize: 14 }}>禁用：</span>
        <DatePicker value={new Date()} disabled />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 80, fontSize: 14 }}>不可清除：</span>
        <DatePicker value={date} onChange={setDate} allowClear={false} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 80, fontSize: 14 }}>自定义占位：</span>
        <DatePicker placeholder="请选择开始日期" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 80, fontSize: 14 }}>自定义格式：</span>
        <DatePicker format="YYYY/MM/DD" />
      </div>
    </div>
  );
};
