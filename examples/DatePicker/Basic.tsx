import React, { useState } from 'react';
import { DatePicker } from '../../src';

export default () => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <DatePicker
        value={date}
        onChange={(d) => setDate(d)}
      />
      {date && (
        <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)' }}>
          已选择：{date.toLocaleDateString('zh-CN')}
        </span>
      )}
    </div>
  );
};
