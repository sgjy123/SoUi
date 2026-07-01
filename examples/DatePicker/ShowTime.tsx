import React, { useState } from 'react';
import { DatePicker } from '../../src';

export default () => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 100, fontSize: 14 }}>日期时间：</span>
        <DatePicker
          showTime
          value={date}
          onChange={(d) => setDate(d)}
        />
      </div>
      {date && (
        <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>
          已选择：{date.toLocaleString('zh-CN')}
        </span>
      )}
    </div>
  );
};
