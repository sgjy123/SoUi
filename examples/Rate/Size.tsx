import React, { useState } from 'react';
import { Rate } from '../../src';

export default () => {
  const [value, setValue] = useState(3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 60, fontSize: 14 }}>小号：</span>
        <Rate size="small" value={value} onChange={setValue} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 60, fontSize: 14 }}>中号：</span>
        <Rate size="medium" value={value} onChange={setValue} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 60, fontSize: 14 }}>大号：</span>
        <Rate size="large" value={value} onChange={setValue} />
      </div>
    </div>
  );
};
