import React, { useState } from 'react';
import { Rate } from '../../src';

export default () => {
  const [value, setValue] = useState(3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 60, fontSize: 14 }}>心形：</span>
        <Rate character="❤" value={value} onChange={setValue} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 60, fontSize: 14 }}>拇指：</span>
        <Rate character="👍" value={value} onChange={setValue} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 60, fontSize: 14 }}>字母：</span>
        <Rate character="A" value={value} onChange={setValue} />
      </div>
    </div>
  );
};
