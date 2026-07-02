import React, { useState } from 'react';
import { DatePicker } from '../../src';
import dayjs from 'dayjs';

export default () => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <DatePicker
          value={date}
          onChange={(d) => setDate(d)}
        />
        <button
          style={{
            padding: '4px 12px',
            fontSize: 14,
            border: '1px solid #d9d9d9',
            borderRadius: 6,
            background: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setDate(dayjs().toDate())}
        >
          设为今天
        </button>
        <button
          style={{
            padding: '4px 12px',
            fontSize: 14,
            border: '1px solid #d9d9d9',
            borderRadius: 6,
            background: '#fff',
            cursor: 'pointer',
          }}
          onClick={() => setDate(null)}
        >
          清除
        </button>
      </div>
      {date && (
        <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>
          已选择：{date.toLocaleDateString('zh-CN')}
        </span>
      )}
    </div>
  );
};
