import React, { useState } from 'react';
import { DatePicker } from '../../src';

export default () => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 50, fontSize: 14 }}>小号：</span>
        <DatePicker size="small" value={date} onChange={setDate} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 50, fontSize: 14 }}>中号：</span>
        <DatePicker size="middle" value={date} onChange={setDate} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 50, fontSize: 14 }}>大号：</span>
        <DatePicker size="large" value={date} onChange={setDate} />
      </div>
    </div>
  );
};
