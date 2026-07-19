import React, { useState } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { Calendar } from '../../src';
import type { CalendarMode } from '../../src';

export default () => {
  const [value, setValue] = useState<Dayjs>(dayjs());
  const [mode, setMode] = useState<CalendarMode>('month');

  const handlePanelChange = (date: Dayjs, newMode: CalendarMode) => {
    setMode(newMode);
  };

  return (
    <Calendar
      value={value}
      mode={mode}
      onChange={setValue}
      onPanelChange={handlePanelChange}
      yearRange={20}
    />
  );
};
