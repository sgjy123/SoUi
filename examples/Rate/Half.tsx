import React, { useState } from 'react';
import { Rate } from '../../src';

export default () => {
  const [value, setValue] = useState(2.5);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Rate allowHalf value={value} onChange={setValue} />
      <span style={{ color: 'rgba(0,0,0,0.45)', fontSize: 14 }}>{value} 星</span>
    </div>
  );
};
