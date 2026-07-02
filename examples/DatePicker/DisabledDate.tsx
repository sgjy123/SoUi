import React, { useState } from 'react';
import { DatePicker } from '../../src';
import dayjs from 'dayjs';

export default () => {
  const [date1, setDate1] = useState<Date | null>(null);
  const [date2, setDate2] = useState<Date | null>(null);
  const [date3, setDate3] = useState<Date | null>(null);

  // 禁用今天之前的日期
  const disabledPast = (current: any) => {
    return current.isBefore(dayjs().startOf('day'));
  };

  // 禁用周末
  const disabledWeekends = (current: any) => {
    return current.day() === 0 || current.day() === 6;
  };

  // 限制前后 30 天内
  const disabledRange = (current: any) => {
    const tooEarly = current.isBefore(dayjs().subtract(30, 'day'), 'day');
    const tooLate = current.isAfter(dayjs().add(30, 'day'), 'day');
    return tooEarly || tooLate;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 130, fontSize: 14 }}>禁用过去日期：</span>
        <DatePicker value={date1} onChange={setDate1} disabledDate={disabledPast} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 130, fontSize: 14 }}>禁用周末：</span>
        <DatePicker value={date2} onChange={setDate2} disabledDate={disabledWeekends} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 130, fontSize: 14 }}>前后30天内：</span>
        <DatePicker value={date3} onChange={setDate3} disabledDate={disabledRange} />
      </div>
    </div>
  );
};
