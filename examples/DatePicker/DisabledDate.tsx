import React, { useState } from 'react';
import { DatePicker } from '../../src';
import dayjs from 'dayjs';

export default () => {
  const [date, setDate] = useState<Date | null>(null);

  // 禁用今天之前的日期
  const disabledDate = (current: any) => {
    return current.isBefore(dayjs().startOf('day'));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 100, fontSize: 14 }}>禁用过去日期：</span>
        <DatePicker
          value={date}
          onChange={setDate}
          disabledDate={disabledDate}
        />
      </div>
    </div>
  );
};
