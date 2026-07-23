import React, { useState } from 'react';
import { Segmented } from '../../src';

export default () => {
  const [value, setValue] = useState<string | number>('day');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ marginBottom: 0, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
        受控模式，当前值：{value}
      </p>
      <Segmented
        value={value}
        onChange={(v) => setValue(v)}
        options={[
          { label: '日', value: 'day' },
          { label: '周', value: 'week' },
          { label: '月', value: 'month' },
        ]}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setValue('day')}>设为日</button>
        <button onClick={() => setValue('week')}>设为周</button>
        <button onClick={() => setValue('month')}>设为月</button>
      </div>
    </div>
  );
};
