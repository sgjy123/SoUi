import React, { useState } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { Calendar } from '../../src';
import type { CalendarMode } from '../../src';

export default () => {
  const [value, setValue] = useState<Dayjs>(dayjs());
  const [mode, setMode] = useState<CalendarMode>('month');

  return (
    <div style={{ width: 320 }}>
      <Calendar
        fullscreen={false}
        value={value}
        mode={mode}
        onChange={setValue}
        onPanelChange={(date, newMode) => setMode(newMode)}
      />
    </div>
  );
};
