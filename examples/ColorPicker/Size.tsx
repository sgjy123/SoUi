import React, { useState } from 'react';
import { ColorPicker } from '../../src';

export default () => {
  const [color, setColor] = useState('#1677FF');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 60, fontSize: 14 }}>小号：</span>
        <ColorPicker size="small" value={color} onChange={setColor} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 60, fontSize: 14 }}>中号：</span>
        <ColorPicker size="medium" value={color} onChange={setColor} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ minWidth: 60, fontSize: 14 }}>大号：</span>
        <ColorPicker size="large" value={color} onChange={setColor} />
      </div>
    </div>
  );
};
