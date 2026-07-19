import React, { useState } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { Calendar } from '../../src';
import type { CalendarMode } from '../../src';

export default () => {
  const [mode, setMode] = useState<CalendarMode>('month');

  // 禁用今天之前的日期和周末
  const disabledDate = (current: Dayjs) => {
    const isBefore = current.isBefore(dayjs(), 'day');
    const isWeekend = current.day() === 0 || current.day() === 6;
    return isBefore || isWeekend;
  };

  return (
    <Calendar
      mode={mode}
      onPanelChange={(_, newMode) => setMode(newMode)}
      disabledDate={disabledDate}
    />
  );
};
