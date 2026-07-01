import React, { useState } from 'react';
import { DatePicker } from '../../src';
import dayjs from 'dayjs';

export default () => {
  const [date, setDate] = useState<Date | null>(null);

  const presets = [
    { label: '今天', value: dayjs() },
    { label: '昨天', value: dayjs().subtract(1, 'day') },
    { label: '一周前', value: dayjs().subtract(7, 'day') },
    { label: '一个月前', value: dayjs().subtract(1, 'month') },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DatePicker
        value={date}
        onChange={(d) => setDate(d)}
        presets={presets}
      />
      {date && (
        <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>
          已选择：{date.toLocaleDateString('zh-CN')}
        </span>
      )}
    </div>
  );
};
