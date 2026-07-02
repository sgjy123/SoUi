import React, { useState } from 'react';
import { RangePicker } from '../../src';
import type { RangeValue } from '../../src';
import dayjs from 'dayjs';

export default () => {
  const [range, setRange] = useState<RangeValue>(null);

  const disabledDate = (current: any) => {
    return current.isBefore(dayjs().startOf('day'));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 130, fontSize: 14 }}>禁用过去日期：</span>
        <RangePicker value={range} onChange={setRange} disabledDate={disabledDate} />
      </div>
      {range && range[0] && range[1] && (
        <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>
          {range[0].toLocaleDateString('zh-CN')} ~ {range[1].toLocaleDateString('zh-CN')}
        </span>
      )}
    </div>
  );
};
