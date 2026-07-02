import React, { useState } from 'react';
import { RangePicker } from '../../src';
import type { RangeValue } from '../../src';

export default () => {
  const [range1, setRange1] = useState<RangeValue>(null);
  const [range2, setRange2] = useState<RangeValue>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 100, fontSize: 14 }}>YYYY/MM/DD：</span>
        <RangePicker value={range1} onChange={setRange1} format="YYYY/MM/DD" />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 100, fontSize: 14 }}>MM-DD-YYYY：</span>
        <RangePicker value={range2} onChange={setRange2} format="MM-DD-YYYY" />
      </div>
    </div>
  );
};
