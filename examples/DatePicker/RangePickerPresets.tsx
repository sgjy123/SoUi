import React, { useState } from 'react';
import { RangePicker } from '../../src';
import type { RangeValue } from '../../src';
import dayjs from 'dayjs';

export default () => {
  const [range, setRange] = useState<RangeValue>(null);

  const presets = [
    { label: '今天', value: [dayjs().startOf('day'), dayjs().endOf('day')] as [dayjs.Dayjs, dayjs.Dayjs] },
    { label: '本周', value: [dayjs().startOf('week'), dayjs().endOf('week')] as [dayjs.Dayjs, dayjs.Dayjs] },
    { label: '本月', value: [dayjs().startOf('month'), dayjs().endOf('month')] as [dayjs.Dayjs, dayjs.Dayjs] },
    { label: '最近7天', value: [dayjs().subtract(6, 'day').startOf('day'), dayjs().endOf('day')] as [dayjs.Dayjs, dayjs.Dayjs] },
    { label: '最近30天', value: [dayjs().subtract(29, 'day').startOf('day'), dayjs().endOf('day')] as [dayjs.Dayjs, dayjs.Dayjs] },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <RangePicker
        value={range}
        onChange={setRange}
        presets={presets}
      />
      {range && range[0] && range[1] && (
        <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>
          {range[0].toLocaleDateString('zh-CN')} ~ {range[1].toLocaleDateString('zh-CN')}
        </span>
      )}
    </div>
  );
};
