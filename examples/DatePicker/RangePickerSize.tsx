import React, { useState } from 'react';
import { RangePicker } from '../../src';
import type { RangeValue } from '../../src';

export default () => {
  const [range, setRange] = useState<RangeValue>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 50, fontSize: 14 }}>小号：</span>
        <RangePicker size="small" value={range} onChange={setRange} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 50, fontSize: 14 }}>中号：</span>
        <RangePicker size="middle" value={range} onChange={setRange} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 50, fontSize: 14 }}>大号：</span>
        <RangePicker size="large" value={range} onChange={setRange} />
      </div>
    </div>
  );
};
