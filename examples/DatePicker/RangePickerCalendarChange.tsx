import React, { useState } from 'react';
import { RangePicker } from '../../src';
import type { RangeValue } from '../../src';

export default () => {
  const [range, setRange] = useState<RangeValue>(null);
  const [calendarDates, setCalendarDates] = useState<string[]>([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <RangePicker
        value={range}
        onChange={(dates, dateStrings) => {
          setRange(dates);
          setCalendarDates([]);
          console.log('最终确认:', dateStrings);
        }}
        onCalendarChange={(dates, dateStrings) => {
          setCalendarDates((prev) => [...prev, dateStrings.join(' ~ ')]);
          console.log('面板变化:', dateStrings);
        }}
      />
      <div style={{ display: 'flex', gap: 16, fontSize: 14 }}>
        <span style={{ color: 'rgba(0,0,0,0.45)' }}>
          面板操作记录：{calendarDates.length > 0 ? calendarDates.join(' → ') : '暂无'}
        </span>
      </div>
      {range && range[0] && range[1] && (
        <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>
          最终范围：{range[0].toLocaleDateString('zh-CN')} ~ {range[1].toLocaleDateString('zh-CN')}
        </span>
      )}
    </div>
  );
};
