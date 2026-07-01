import React, { useState } from 'react';
import { DatePicker } from '../../src';
import type { PickerMode } from '../../src';

const modes: { mode: PickerMode; label: string }[] = [
  { mode: 'date', label: '日期选择' },
  { mode: 'week', label: '周选择' },
  { mode: 'month', label: '月份选择' },
  { mode: 'year', label: '年份选择' },
];

export default () => {
  const [values, setValues] = useState<Record<string, Date | null>>({});

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {modes.map(({ mode, label }) => (
        <div key={mode} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ minWidth: 80, fontSize: 14 }}>{label}：</span>
          <DatePicker
            picker={mode}
            value={values[mode] || null}
            onChange={(d) => setValues((prev) => ({ ...prev, [mode]: d }))}
          />
        </div>
      ))}
    </div>
  );
};
