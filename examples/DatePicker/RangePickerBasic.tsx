import React, { useState } from 'react';
import { RangePicker } from '../../src';
import type { RangeValue } from '../../src';

export default () => {
  const [range, setRange] = useState<RangeValue>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <RangePicker
        value={range}
        onChange={(dates, strings) => {
          setRange(dates);
          console.log('范围:', strings);
        }}
      />
      {range && range[0] && range[1] && (
        <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>
          {range[0].toLocaleDateString('zh-CN')} ~ {range[1].toLocaleDateString('zh-CN')}
        </span>
      )}
    </div>
  );
};
