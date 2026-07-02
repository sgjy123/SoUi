import React, { useState } from 'react';
import { TimePicker } from '../../src';
import dayjs from 'dayjs';

const RangePicker = TimePicker.RangePicker;

export default () => {
  const [value, setValue] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([
    dayjs('09:00:00', 'HH:mm:ss'),
    dayjs('18:00:00', 'HH:mm:ss'),
  ]);

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', flexDirection: 'column' }}>
      <RangePicker />
      <RangePicker
        value={value}
        onChange={(times, strings) => {
          setValue(times);
          console.log('时间范围:', strings[0], '~', strings[1]);
        }}
      />
    </div>
  );
};
