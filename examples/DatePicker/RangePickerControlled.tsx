import React, { useState } from 'react';
import { RangePicker } from '../../src';
import type { RangeValue } from '../../src';
import dayjs from 'dayjs';

export default () => {
  const [range, setRange] = useState<RangeValue>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <RangePicker
          value={range}
          onChange={(dates) => setRange(dates)}
        />
        <button
          style={{
            padding: '4px 12px',
            fontSize: 14,
            border: '1px solid #d9d9d9',
            borderRadius: 6,
            background: '#fff',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
          onClick={() => setRange([dayjs().startOf('day').toDate(), dayjs().endOf('day').toDate()])}
        >
          选择今天
        </button>
        <button
          style={{
            padding: '4px 12px',
            fontSize: 14,
            border: '1px solid #d9d9d9',
            borderRadius: 6,
            background: '#fff',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
          onClick={() => setRange(null)}
        >
          清除
        </button>
      </div>
      {range && range[0] && range[1] && (
        <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>
          {range[0].toLocaleDateString('zh-CN')} ~ {range[1].toLocaleDateString('zh-CN')}
        </span>
      )}
    </div>
  );
};
