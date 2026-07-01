import React, { useState } from 'react';
import { DatePicker } from '../../src';
import type { PickerMode } from '../../src';

const modes: { mode: PickerMode; label: string; format: string }[] = [
  { mode: 'date', label: '日期选择', format: 'YYYY-MM-DD' },
  { mode: 'week', label: '周选择', format: 'YYYY-第w周' },
  { mode: 'month', label: '月份选择', format: 'YYYY-MM' },
  { mode: 'year', label: '年份选择', format: 'YYYY' },
];

export default () => {
  const [values, setValues] = useState<Record<string, Date | null>>({});

  return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {modes.map(({ mode, label, format }) => (
            <div key={mode} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ minWidth: 80, fontSize: 14 }}>{label}：</span>
              <DatePicker
                  picker={mode}
                  format={format}
                  value={values[mode] || null}
                  onChange={(d) => setValues((prev) => ({ ...prev, [mode]: d }))}
              />
            </div>
        ))}
      </div>
  );
};
